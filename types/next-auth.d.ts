
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      email?: string | null;
      image?: string | null;
    };
    organization?: {
      orgId?: string;
      orgName?: string;
      role?: "admin" | "member";
    }
    accessToken: string;
  }

    interface User {
    id: string;
    email?: string | null;
    username?: string | null;
    image?: string | null;
    token?: string;
    organization?: {
      orgId?: string;
      orgName?: string;
      role?: "admin" | "member";
    }
  }

  interface Account {
    access_token?: string;
    id_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username?: string | null;
      email?: string | null;
      image?: string | null;
    };
    organization?: {
      orgId?: string;
      orgName?: string;
      role?: "admin" | "member";
    }
    accessToken: string;
    refreshToken?: string;
  }
} 

