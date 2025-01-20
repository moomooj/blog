import ArticleList from "@/components/article-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";

const getCachedArticles = nextCache(getInitialArticles, ["home-articles"], {
  revalidate: 60, 
});

async function getInitialArticles() {
  const articles = await db.article.findMany({
    select: {
      title: true,
      created_at: true,
      description: true,
      photo: true,
      id: true,
    },
    take: 3,
    orderBy: {
      created_at: "asc",
    },
  });
  return articles;
}

export type InitialArtcles = Prisma.PromiseReturnType<
  typeof getInitialArticles
>;

export const metadata: Metadata = {
  title: "Home | Blog",
};

export default async function Home() {
  const initialArtcles = await getCachedArticles();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleList initialArtcles={initialArtcles} />
        <Link href="/artcles/add">add artcles</Link>
      </div>
    </div>
  );
}
