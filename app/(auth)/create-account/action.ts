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
      .toLowerCase()
      .refine(checkUsername, "this Username is not allowed"),
    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "This field is required.",
      })
      .email()
      .toLowerCase(),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Create an Password at least 4 characters long."
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Create an Password at least 4 characters long."
      ),
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
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
