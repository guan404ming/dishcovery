import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/db";
import { userTable } from "@/db/schema";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      await db
        .insert(userTable)
        .values({
          name: user.name as string,
          email: user.email as string,
          role: "User",
        })
        .onConflictDoUpdate({
          target: userTable.email,
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
      const [user] = await db
        .select({ role: userTable.role })
        .from(userTable)
        .execute();

      session.user.role = user.role;

      return {
        ...session,
      };
    },
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
