
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    username?: string;
    image?: string;
    role?: "admin" | "member";
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      username?: string;
      image?: string;
      role?: "admin" | "member";
    };
    accessToken?: string;
    refreshToken?: string;
  }

  interface Account {
    access_token?: string;
    id_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    role?: "admin" | "member";
    accessToken?: string;
    refreshToken?: string;
    picture?: string;
  }
} 

