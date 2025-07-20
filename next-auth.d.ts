// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "admin" | "member";
    };
    accessToken: string;
  }

    interface User {
    id: string;
    email?: string | null;
    username?: string | null;
    image?: string | null;
    token?: string;
    role?: "admin" | "member";
  }

  interface JWT {
    id: string;
    accessToken: string;  
  }
}

