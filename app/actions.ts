"use server";

import db from "@/lib/db";

export async function getMoreArticles(page: number) {
  const articles = await db.article.findMany({
    select: {
      title: true,
      created_at: true,
      description: true,
      photo: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "asc",
    },
  });
  return articles;
}
