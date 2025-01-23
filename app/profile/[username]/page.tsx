import ArticleList from "@/components/article-list";
import { getUser } from "./actions";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);

  return (
    <div>{user ? <ArticleList initialArticles={user?.Article} /> : null}</div>
  );
}
