import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
              role: data.user.role,
              accessToken: data.tokens?.access,
              refreshToken: data.tokens?.refresh,
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
          user.id = data.user.id;
          user.username = data.user.username;
          user.role = data.user.role;
          user.accessToken = data.tokens?.access;
          user.refreshToken = data.tokens?.refresh;
          user.image = data.user.image || (profile as { picture?: string }).picture;
        } catch (err) {
          console.error("Google login failed:", err);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? undefined;
        token.role = user.role ?? undefined;
        token.accessToken = user.accessToken ?? user.token;
        token.refreshToken = user.refreshToken ?? undefined;
        token.picture = user.image ?? undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as 'admin' | 'member' | undefined;
        session.user.image = token.picture as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
