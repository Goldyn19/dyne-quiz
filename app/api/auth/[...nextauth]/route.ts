import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await res.json();
    return {
      accessToken: data.access,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (response.ok && data) {
            return {
              id: data.user.id,
              email: data.user.email,
              username: data.user.username,
              image: data.user.image,
              accessToken: data.tokens?.access,
              refreshToken: data.tokens?.refresh,
              organization: {
                orgId: data.user.org_id?.toString(),
                orgName: data.user.org_name,
                role: data.user.role,
              },
            };
          } else if (response.status === 401) {
            throw new Error(data.message || "Invalid username or password");
          } else if (response.status === 500) {
            throw new Error("Internal server error");
          } else {
            throw new Error(data.message || "Login failed");
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Handle Google OAuth + pass data to backend
    async signIn({ account, profile, user }) {
      if (account?.provider === "google" && profile) {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/auth/google-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              name: profile.name,
              image: (profile as { picture?: string }).picture,
              // Pass Google access token for backend verification
              token: account.access_token,
              googleIdToken: account.id_token,
            }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.error || "Google login failed");

          // Attach backend data
          const typedUser = user as import("next-auth").User & { accessToken?: string; refreshToken?: string };
          typedUser.id = data.user.id;
          typedUser.username = data.user.username;
          typedUser.organization = {
            orgId: data.user.org_id?.toString(),
            orgName: data.user.org_name,
            role: data.user.role,
          };
          typedUser.accessToken = data.tokens?.access;
          typedUser.refreshToken = data.tokens?.refresh;
          typedUser.image = data.user.image || (profile as { picture?: string }).picture;
        } catch (err) {
          console.error("Google login failed:", err);
          return false;
        }
      }
      return true;
    },


    async jwt({ token, user, trigger, session }) {
      if (user) {
        const customUser = user as import("next-auth").User & { accessToken?: string; refreshToken?: string; token?: string };
        token.user = {
          id: customUser.id,
          username: customUser.username ?? undefined,
          email: customUser.email ?? undefined,
          image: customUser.image ?? undefined,
        };
        token.organization = customUser.organization ?? undefined;
        token.accessToken = customUser.accessToken || customUser.token || "";
        token.refreshToken = customUser.refreshToken ?? undefined;

        // Set TTL
        token.accessTokenExpires = Date.now() + 2 * 60 * 60 * 1000;
        token.refreshTokenExpires = Date.now() + 2 * 24 * 60 * 60 * 1000;

      }

      // Handle refresh logic
      const accessTokenExpired = Date.now() >= (token.accessTokenExpires as number);
      const refreshTokenValid = Date.now() < (token.refreshTokenExpires as number);
      // Handle updates from update()
      if (trigger === "update" && session?.organization) {
        token.organization = session.organization;
      }

      // Check if the token has expired
      if (accessTokenExpired) {
        console.log("Access token expired. Attempting to refresh…");

        if (refreshTokenValid && token.refreshToken) {
          try {
            const refreshed = await refreshAccessToken(token.refreshToken);
            token.accessToken = refreshed.accessToken;
            token.accessTokenExpires = Date.now() + 2 * 60 * 60 * 1000;
          } catch (err) {
            console.error("Failed to refresh access token", err);
            return {...token, error: "RefreshAccessTokenError" };
          }
        } else {
          console.warn("Refresh token expired. Signing user out.");
          return {...token, error: "Refresh token expired. Signing user out." };
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: (token.user?.id ?? "") as string,
          username: token.user?.username,
          email: token.user?.email,
          image: token.user?.image,
        };
        session.organization = token.organization ?? undefined;
        session.accessToken = typeof token.accessToken === "string" ? token.accessToken : "";
        // Optionally add refreshToken if you want
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
