"use server";

import database from "@/libs/database";
import { signIn as authSignIn } from "@/libs/auth";
import { redirect } from "@/libs/navigation";

export const signIn = async ({ data }: { data: { email: string } }) => {
  const user = await database.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) return { error: "ACCOUNT_NOT_FOUND" };

  await authSignIn("nodemailer", {
    email: data.email,
    redirect: false,
  });

  redirect("/auth/verify-email");
};

export const signUp = async ({
  data,
}: {
  data: { name: string; email: string };
}) => {
  const user = await database.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) return { error: "ACCOUNT_ALREADY_EXISTS" };

  await database.user.create({ data });

  await authSignIn("nodemailer", {
    email: data.email,
    redirect: false,
  });

  redirect("/auth/verify-email");
};
