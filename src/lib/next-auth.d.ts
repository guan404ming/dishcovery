/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      role: "Admin" | "User";
    } & DefaultSession["user"];
  }
}
