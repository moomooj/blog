"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function deleteAccount() {
  const session = await getSession();
  const userId = session.id;

  const user = await db.user.delete({
    where: {
      id: userId,
    },
  });
  session.destroy();
  redirect(`/`);
}
