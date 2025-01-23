"use server";

import db from "@/lib/db";
import { InfinityScrollCardNumber } from "@/lib/utils";
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
        select: { avatar: true, username: true },
      },
    },
    take: InfinityScrollCardNumber,
    orderBy: {
      createdAt: "desc",
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
        select: { avatar: true, username: true },
      },
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
}
