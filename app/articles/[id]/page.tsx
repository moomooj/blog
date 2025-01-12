import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

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
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>{article.user.username}</span>
      <br />
      {isOwner ? <button>edit article</button> : null}
    </div>
  );
}
