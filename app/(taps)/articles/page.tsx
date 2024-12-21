import db from "@/lib/db";
import ListArticle from "@/components/list-article";

async function getArticles() {
  const Articles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      created_at: true,
    },
  });
  return Articles;
}

export default async function Articles() {
  const articles = await getArticles();
  return (
    <div className="w-full mx-auto max-w-screen-md">
      {articles.map((article) => (
        <ListArticle key={article.id} {...article} />
      ))}
    </div>
  );
}
