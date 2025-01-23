import ArticleList from "@/components/article-list";
import { getUser } from "./actions";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user ? <ArticleList initialArticles={user?.Article} /> : null}
      </div>
    </div>
  );
}
