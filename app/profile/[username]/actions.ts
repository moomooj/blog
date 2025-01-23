"use server";

import db from "@/lib/db";
import { InfinityScrollCardNumber } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function getUser(username: string) {
  if (username) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        Article: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            createdAt: true,
            user: {
              select: {
                avatar: true,
                username: true,
              },
            },
          },

          take: InfinityScrollCardNumber,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (user) {
      return user;
    } else {
      return notFound();
    }
  }
}
