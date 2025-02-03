"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const parseTags = (val: unknown): string[] => {
  if (typeof val !== "string") return [];
  const parsed = JSON.parse(val);
  return Array.isArray(parsed) ? parsed : [];
};

const articleSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Maximum characters are 100" }),
  content: z.string({ required_error: "content is required" }),
  description: z
    .string()
    .max(300, { message: "Description can have a maximum of 300 characters" })
    .optional(),
  thumbnail: z
    .string({ required_error: "thumbnail is required" })
    .url({ message: "Invalid URL format for thumbnail" }),

  published: z.string().transform((val) => val === "true"),

  tags: z.string().default("[]").transform(parseTags),
});

export async function createArtcle(_: any, formData: FormData) {
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
      });
      redirect(`/`);
    }
  }
}
