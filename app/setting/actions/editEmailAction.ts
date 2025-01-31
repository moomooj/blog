"use server";

import db from "@/lib/db";
import { z } from "zod";

const formSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "This field is required.",
      })
      .email()
      .toLowerCase(),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is alredy taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function updateEmail(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    userId: formData.get("userId"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const newEmail = await db.user.update({
      where: { id: Number(data.userId) },
      data: {
        email: result.data.email,
      },
      select: { email: true },
    });
    return { ...newEmail, ok: true };
  }
}
