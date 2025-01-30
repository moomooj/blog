"use server";

import db from "@/lib/db";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("admin");
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "This field is required.",
      })
      .min(3, "Create an Username at least 3 characters long.")
      .max(10, "Enter an Username under 10 characters.")
      .trim()
      .regex(
        /^[a-z0-9_]+$/,
        "Only letters, numbers, and underscores are allowed."
      )
      .toLowerCase()
      .refine(checkUsername, "this Username is not allowed"),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is alredy taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function updateUsername(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    userId: formData.get("userId"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const newUsername = await db.user.update({
      where: { id: Number(data.userId) },
      data: {
        username: result.data.username,
      },
      select: { username: true },
    });
    return { ...newUsername, ok: true };
  }
}
