import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      await db
        .insert(users)
        .values({
          name: user.name as string,
          email: user.email as string,
          role: "user",
        })
        .onConflictDoUpdate({
          target: users.email,
          set: {
            name: user.name as string,
          },
        })
        .returning()
        .execute();
    },
  },

  callbacks: {
    async session({ session }) {
      const user = await db.query.users.findFirst({
        where: eq(users.email, session.user.email as string),
      });

      if (!user) throw new Error("User Not Found");
      session.user.id = user.id;
      session.user.role = user.role;

      return {
        ...session,
      };
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
