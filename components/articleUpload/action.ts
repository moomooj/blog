"use server";

import { z } from "zod";
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
  content: z.string({ required_error: "content is required" }),
  thumbnail: z.string({
    required_error: "thumbnail is required",
  }),
  description: z.string({
    required_error: "description is required",
  }),
});

export async function updateArtcle(
  articleNumber: number | null,
  formData: FormData
) {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
    description: formData.get("description"),
    thumbnail: formData.get("thumbnail"),
    published: formData.get("published"),
    tags: formData.get("tags"),
  };

  const results = articleSchema.safeParse(data);

  if (!results.success) {
    return results.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const article = await db.article.update({
        where: { id: articleNumber! },
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
      redirect(`/`);
    }
  }
}

export async function uploadArtcle(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
    description: formData.get("description"),
    thumbnail: formData.get("thumbnail"),
  };
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
      redirect(`/`);
    }
  }
}
