import { notFound } from "next/navigation";
import { getArticle } from "../action";
import EditArtcleForm from "./ui/editArtcleForm";
import { getIsOwner } from "@/lib/IsOwner";

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
