"use server";

import database from "@/libs/database";

export const getBlog = async ({ slug }: { slug: string }) => {
  const blogFound = await database.blog.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  });

  return blogFound;
};

export const getBlogPosts = async ({ blogId }: { blogId: string }) => {
  const postsFound = await database.post.findMany({
    where: {
      blogId,
      deletedAt: null,
    },
  });

  return postsFound;
};

export const getBlogPost = async ({
  blogSlug,
  postSlug,
}: {
  blogSlug: string;
  postSlug: string;
}) => {
  const blog = await getBlog({ slug: blogSlug });

  if (!blog) return { error: "BLOG_NOT_FOUND" };

  const postFound = await database.post.findFirst({
    where: {
      slug: postSlug,
      blogId: blog.id,
      deletedAt: null,
    },
    include: {
      user: true,
    },
  });

  return postFound;
};
