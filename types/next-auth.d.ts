import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    username?: string;
    image?: string;
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      username?: string;
      image?: string;
    };
    accessToken?: string;
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
    accessToken?: string;
    picture?: string;
  }
} 