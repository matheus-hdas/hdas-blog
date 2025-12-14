"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/libs/auth";
import { getBlogUser } from "@/server/admin/blog.user.service";
import database from "@/libs/database";

export const getBlogPosts = async ({ blogSlug }: { blogSlug: string }) => {
  const session = await auth();
  const user = session?.user;

  if (!user) return { error: "UNAUTHORIZED" };

  const blog = await database.blog.findUnique({
    where: { slug: blogSlug },
    select: { id: true },
  });
  const blogUser = await getBlogUser({ userId: user.id!, blogId: blog?.id! });

  let where: Record<string, unknown> = {
    blog: { slug: blogSlug },
    deletedAt: null,
  };

  if (blogUser?.role === "AUTHOR") {
    where = {
      ...where,
      userId: user.id,
    };
  }

  const blogPostsFound = await database.post.findMany({
    where,
    include: {
      user: true,
    },
  });

  return blogPostsFound;
};

export const createBlogPost = async ({
  data,
}: {
  data: {
    title: string;
    subtitle?: string;
    slug: string;
    body: string;
    blogId: string;
  };
}) => {
  const session = await auth();
  const user = session?.user;

  if (!user) return { error: "UNAUTHORIZED" };

  const postExists = await database.post.count({ where: { slug: data.slug } });
  if (postExists) return { error: "SLUG_ALREADY_EXISTS" };

  await database.post.create({
    data: {
      ...data,
      userId: user.id!,
    },
  });

  revalidatePath("/admin/posts");
};

export const updateBlogPost = async ({
  postId,
  data,
}: {
  postId: string;
  data: { title: string; subtitle?: string; slug: string; body: string };
}) => {
  const post = await database.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.slug !== data.slug) {
    if ((await database.post.count({ where: { slug: data.slug } })) > 0) {
      return { error: "SLUG_ALREADY_EXISTS" };
    }
  }

  await database.post.update({
    where: {
      id: postId,
    },
    data,
  });

  revalidatePath("/admin/posts");
};

export const deleteBlogPost = async ({ postId }: { postId: string }) => {
  await database.post.update({
    where: {
      id: postId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/admin/posts");
};
