import ListArtcle from "@/components/list-article";
import db from "@/lib/db";

async function getArticles() {
  const articles = await db.article.findMany({
    select: {
      title: true,
      created_at: true,
      description: true,
      photo: true,
      id: true,
    },
  });
  return articles;
}

export default async function Home() {
  const artcles = await getArticles();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artcles.map((artcle) => (
          <ListArtcle key={artcle.id} {...artcle} />
        ))}
      </div>
    </div>
  );
}
