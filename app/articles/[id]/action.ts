"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import sanitizeHtml from "sanitize-html";

export async function getArticle(id: number) {
  const article = await db.article.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      tags: true,
    },
  });
  return article;
}

export async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function sanitizeHTML(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [
      "div",
      "span",
      "p",
      "br",
      "b",
      "i",
      "u",
      "strong",
      "em",
      "a",
      "img",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
    ],
    allowedAttributes: {
      "*": ["class", "style", "title"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      span: ["style"],
      div: ["style"],
      p: ["style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["data", "http", "https"],
    },
    allowProtocolRelative: true,
  });
}
