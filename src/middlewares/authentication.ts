import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export const isAuthenticated = async () => {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");
  return session;
};

export const isNotAuthenticated = async () => {
  const session = await auth();

  if (session?.user) redirect("/");
};
