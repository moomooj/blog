"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getArticle(id: number) {
  const article = await db.article.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      tags: true,
    },
  });
  return article;
}

export async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}
