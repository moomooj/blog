"use server";
import { z } from "zod";
import db from "@/lib/db";

const avatarSchema = z.object({
  avatar: z.string({
    required_error: "avatar is required",
  }),
});

export async function updateAvatar(userId: number, formData: FormData) {
  const data = {
    avatar: formData.get("avatar"),
  };

  const results = avatarSchema.safeParse(data);

  if (!results.success) {
    return results.error.flatten();
  } else {
    const newAvatar = await db.user.update({
      where: { id: userId },
      data: {
        avatar: results.data.avatar,
      },
      select: { avatar: true },
    });
    return { ...newAvatar, ok: true };
  }
}
