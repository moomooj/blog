"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const articleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
    })
    .min(2)
    .max(255),
  content: z.string({ required_error: "description is required" }),
  thumbnail: z.string(),
  description: z.string(),
});

export async function uploadArtcle(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
    description: formData.get("description"),
    thumbnail: formData.get("thumbnail"),
  };
  if (data.thumbnail instanceof File) {
    const thumbnailData = await data.thumbnail.arrayBuffer();
    await fs.appendFile(
      `./public/${data.thumbnail.name}`,
      Buffer.from(thumbnailData)
    );
    data.thumbnail = `/${data.thumbnail.name}`;
  }
  const results = articleSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const article = await db.article.create({
        data: {
          title: results.data.title,
          content: results.data.content,
          description: results.data.description,
          thumbnail: results.data.thumbnail,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/article/${article.id}`);
    }
  }
}
