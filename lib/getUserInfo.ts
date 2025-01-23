"use server";

import db from "./db";
import getSession from "./session";

type UserInfo = {
  avatar: string;
  username: string;
} | null;

export default async function getUserInfo(): Promise<UserInfo> {
  const session = await getSession();
  if (!session?.id) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      avatar: true,
      username: true,
    },
  });
  return user;
}
