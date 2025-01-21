"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getInitialArticles() {
  const articles = await db.article.findMany({
    select: {
      title: true,
      createdAt: true,
      description: true,
      thumbnail: true,
      id: true,
      user: {
        select: { avatar: true },
      },
    },
    take: 5,
    orderBy: {
      createdAt: "asc",
    },
  });
  return articles;
}

export type InitialArticles = Prisma.PromiseReturnType<
  typeof getInitialArticles
>;

export async function getMoreArticles(page: number) {
  const articles = await db.article.findMany({
    select: {
      title: true,
      createdAt: true,
      description: true,
      thumbnail: true,
      id: true,
      user: {
        select: { avatar: true },
      },
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      createdAt: "asc",
    },
  });
  return articles;
}
