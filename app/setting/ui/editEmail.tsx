"use client";

import Button from "@/components/button";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updateEmail } from "../actions/editEmailAction";

export default function EditEmail({
  email,
  userId,
}: {
  email: string | null | undefined;
  userId: number;
}) {
  const [oldEmail, setOldEmail] = useState(email);
  const [emailPanel, setEmailPanel] = useState(false);

  const [state, action] = useFormState(updateEmail, null);

  const updateEmailWithId = (formData: FormData) => {
    if (oldEmail === formData.get("email")) {
      setEmailPanel(false);
      return;
    }
    formData.append("userId", userId.toString());
    action(formData);
  };
  useEffect(() => {
    if (state && "ok" in state) {
      setOldEmail(state.email);
      setEmailPanel(false);
    }
  }, [state]);

  return (
    <form action={updateEmailWithId} className="space-y-2">
      <h3 className="text-lg font-medium text-gray-700">Email</h3>
      <div className="flex flex-col items-end justify-between">
        <input
          onFocus={() => setEmailPanel(true)}
          name="email"
          type="email"
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={oldEmail ? oldEmail : ""}
        />
        {emailPanel ? <Button text="Save" /> : null}
      </div>
    </form>
  );
}
