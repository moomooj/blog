"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function deleteArticle({ articleId }: { articleId: number }) {
  const article = await db.article.delete({
    where: {
      id: articleId,
    },
  });

  redirect(`/`);
}
