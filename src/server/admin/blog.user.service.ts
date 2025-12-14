"use server";

import { BlogUser } from "@prisma/client";
import { revalidatePath } from "next/cache";
import database from "@/libs/database";

export const getBlogUsers = async ({ blogSlug }: { blogSlug: string }) => {
  const usersFound = await database.blogUser.findMany({
    where: {
      blog: { slug: blogSlug },
    },
    include: {
      user: true,
    },
  });

  return usersFound;
};

export const getBlogUser = async ({
  userId,
  blogId,
}: {
  userId: string;
  blogId: string;
}) => {
  const userFound = await database.blogUser.findFirst({
    where: {
      userId,
      blogId,
    },
    include: {
      user: true,
    },
  });

  return userFound;
};

export const createBlogUser = async ({
  data,
}: {
  data: { email: string; blogId: string; role: BlogUser["role"] };
}) => {
  const user = await database.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) return { error: "USER_EMAIL_NOT_FOUND" };

  const blogUserExists = await database.blogUser.count({
    where: {
      blogId: data.blogId,
      userId: user.id,
    },
  });

  if (blogUserExists > 0) return { error: "USER_ALREADY_IN_BLOG" };

  await database.blogUser.create({
    data: {
      blogId: data.blogId,
      role: data.role,
      userId: user.id,
    },
  });

  revalidatePath("/admin/users");
};

export const updateBlogUserRole = async ({
  blogUserId,
  data,
}: {
  blogUserId: string;
  data: { role: BlogUser["role"] };
}) => {
  await database.blogUser.update({
    where: {
      id: blogUserId,
    },
    data: {
      role: data.role,
    },
  });

  revalidatePath("/admin/users");
};

export const deleteBlogUser = async ({
  blogUserId,
}: {
  blogUserId: string;
}) => {
  await database.blogUser.delete({
    where: {
      id: blogUserId,
    },
  });

  revalidatePath("/admin/users");
};
