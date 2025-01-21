import ArticleList from "@/components/article-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

const getCachedArticles = nextCache(getInitialArticles, ["home-articles"]);

async function getInitialArticles() {
  const articles = await db.article.findMany({
    select: {
      title: true,
      createdAt: true,
      description: true,
      thumbnail: true,
      id: true,
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

export const metadata: Metadata = {
  title: "Home | Blog",
};

export default async function Home() {
  const initialArticles = await getCachedArticles();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleList initialArticles={initialArticles} />
      </div>
    </div>
  );
}
