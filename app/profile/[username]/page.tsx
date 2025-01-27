import ArticleList from "@/components/article-list";
import { getUser } from "./actions";
import Image from "next/image";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);

  return (
    <div className="max-w-6xl mx-auto">
      {user ? (
        <>
          <div className="flex items-center gap-10 p-12">
            <Image
              className="rounded-full"
              width={100}
              height={100}
              src={`${user.avatar}`}
              alt={`${user.username}Avatar`}
            />
            <h2 className="text-xl">{user.username}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleList initialArticles={user?.Article} />
          </div>
        </>
      ) : null}
    </div>
  );
}
