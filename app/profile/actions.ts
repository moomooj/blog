import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      include: {
        Article: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            createdAt: true,
          },
        },
      },
    });

    if (user) {
      return user;
    }
  }
  notFound();
}
