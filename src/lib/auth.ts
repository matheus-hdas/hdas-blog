import NextAuth from "next-auth";
import prisma from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

const nodemailerServer: any = {
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: false,
};

if (process.env.NODE_ENV === "production") {
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;

  if (user && user.trim() !== "" && pass && pass.trim() !== "") {
    nodemailerServer.auth = {
      user,
      pass,
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: nodemailerServer,
      from: process.env.EMAIL_FROM,
    }),
    Google,
    Facebook,
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
  },
});
