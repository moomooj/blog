"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { login } from "./action";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function LogIn() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6 max-w-md mx-auto">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
      <div className="text-center">
        <Link
          href={"/create-account"}
          className="text-blue-500 hover:underline"
        >
          Need an account? Create one
        </Link>
      </div>
    </div>
  );
}
