"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  const userId = session?.id;
  if (userId) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        avatar: true,
      },
    });
    return user || null;
  }
  return null;
}
