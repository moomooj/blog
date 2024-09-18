"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("admin");

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "where is my username?",
      })
      .min(3, "Way too short")
      .max(10, "That is too long")
      .refine(checkUsername, "admin is not allowed"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        checkUniqueEmail,
        "There is an account already registered with that email."
      ),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    message: "Both passwords should be same",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        name: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
  }
}
