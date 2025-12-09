import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";
import database from "@/lib/database";

const mailProvider = Email({
  server: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth:
      process.env.NODE_ENV === "development"
        ? {}
        : {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
  },
  from: process.env.MAIL_FROM,
});

const googleProvider = Google({
  clientId: process.env.AUTH_GOOGLE_ID || "",
  clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(database),
  providers: [mailProvider, googleProvider],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
});
