import { notFound } from "next/navigation";
import styles from "./article.module.css";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getIsOwner, sanitizeHTML } from "./action";
import DelteArtcle from "@/components/articleDelete/articleDelete";

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
  const articleId = Number(params.id);
  if (isNaN(articleId)) return notFound();
  const article = await getArticle(articleId);
  if (!article) return notFound();
  const isOwner = await getIsOwner(article.userId);

  const arraytest = [1, 2, 3, 4, 5, 6];

  const cleanHTML = await sanitizeHTML(article.content);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-2">
        <h1 className="text-5xl font-bold text-gray-900 mb-10">
          {article.title}
        </h1>
        <div className="flex flex-col gap-6">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="font-medium text-lg">
                {article.user.username}
              </span>
              <span>•</span>
              <span>{formatToTimeAgo(`${article.createdAt}`)}</span>
            </div>
            <div>
              {isOwner ? (
                <div className="flex space-x-4 text-sm text-gray-600">
                  <Link
                    href={`${article.id}/edit`}
                    className="bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-yellow-400 hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                  <DelteArtcle articleId={articleId} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {arraytest.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                {`Tag ${tag}`}
              </span>
            ))}
          </div>
          <div className="w-full aspect-video relative rounded-lg overflow-hidden">
            <Image
              fill
              src={`${article.thumbnail!}/article`}
              alt={`${article.title}`}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <article
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
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
          {isOwner ? null : (
            <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
              Follow
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}
