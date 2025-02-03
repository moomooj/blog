import ArtcleForm from "@/components/articleUpload/articleUpload";
import { notFound } from "next/navigation";
import { getArticle, getIsOwner } from "../action";
import EditArtcleForm from "./ui/editArtcleForm";

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
      {isOwner ? <EditArtcleForm article={article} articleNumber={id} /> : null}
    </>
  );
}
