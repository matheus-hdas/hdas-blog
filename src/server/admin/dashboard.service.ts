"use server";

import { auth } from "@/libs/auth";
import database from "@/libs/database";

export const getDashboardData = async ({ blogId }: { blogId: string }) => {
  const session = await auth();

  const totalUsers = await database.blogUser.count({ where: { blogId } });
  const totalPosts = await database.post.count({ where: { blogId } });
  const totalPostsMadeByYou = await database.post.count({
    where: { blogId, userId: session?.user?.id },
  });

  return { totalUsers, totalPosts, totalPostsMadeByYou };
};
