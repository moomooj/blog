"use server";

import db from "@/lib/db";

export async function getMoreArticles(page: number) {
  const articles = await db.article.findMany({
    select: {
      title: true,
      createdAt: true,
      description: true,
      thumbnail: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      createdAt: "asc",
    },
  });
  return articles;
}
