import ArticleList from "@/components/article-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialArticles() {
  const articles = await db.article.findMany({
    select: {
      title: true,
      created_at: true,
      description: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "asc",
    },
  });
  return articles;
}

export type InitialArtcles = Prisma.PromiseReturnType<
  typeof getInitialArticles
>;

export default async function Home() {
  const initialArtcles = await getInitialArticles();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleList initialArtcles={initialArtcles} />
        <Link href="/artcles/add">add artcles</Link>
      </div>
    </div>
  );
}
