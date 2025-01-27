import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import styles from "./article.module.css";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getArticle(id: number) {
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
    },
  });
  return article;
}

export async function generateMetadata({
  params,
}: {
  params: { id?: string };
}) {
  if (!params?.id || isNaN(Number(params.id))) {
    return {
      title: "Default Title",
    };
  }
  const article = await getArticle(Number(params.id));
  return {
    title: article ? `${article.title}` : "Article Not Found",
  };
}

export default async function ArticleDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const article = await getArticle(id);
  if (!article) return notFound();
  const isOwner = await getIsOwner(article.userId);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-2">
        <h1 className="text-5xl font-bold text-gray-900 mb-10">
          {article.title}
        </h1>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="font-medium">{article.user.username}</span>
            <span>•</span>
            <span>{formatToTimeAgo(`${article.createdAt}`)}</span>
          </div>
          <div className="w-full aspect-video relative rounded-lg overflow-hidden">
            <Image
              width={1200}
              height={630}
              src={`${article.thumbnail}/article`}
              alt={`${article.title}`}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <br />
      <article
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <div className="mt-16 border-t border-gray-200 pt-8">
        <Link
          href={`/profile/${article.user.username}`}
          className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Image
              width={64}
              height={64}
              src={article.user.avatar || "/default-avatar.png"}
              alt={article.user.username}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">
                {article.user.username}
              </span>
              <span className="text-sm text-gray-600">View profile</span>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
            Follow
          </button>
        </Link>
      </div>
    </div>
  );
}
