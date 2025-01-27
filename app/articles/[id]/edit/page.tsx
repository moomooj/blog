import ArtcleForm from "@/components/articleUpload/articleUpload";
import { notFound } from "next/navigation";
import { getArticle, getIsOwner } from "../action";

export default async function EditArtcle({
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
    <>
      {isOwner ? (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Edit Your Article
          </h1>
          <ArtcleForm article={article} articleNumber={id} />
        </div>
      ) : null}
    </>
  );
}
