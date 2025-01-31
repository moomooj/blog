"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updateUsername } from "../actions/editUsername";
import Button from "@/components/button";

export default function EditUsername({
  username,
  userId,
}: {
  username: string | undefined;
  userId: number;
}) {
  const [oldUsername, setOldUsername] = useState(username);
  const [userNamePanel, setUserNamePanel] = useState(false);

  const [state, action] = useFormState(updateUsername, null);

  const updateUserWithId = (formData: FormData) => {
    if (oldUsername === formData.get("username")) {
      setUserNamePanel(false);
      return;
    }
    formData.append("userId", userId.toString());
    action(formData);
  };
  useEffect(() => {
    if (state && "ok" in state) {
      setOldUsername(state.username);
      setUserNamePanel(false);
    }
  }, [state]);

  return (
    <form action={updateUserWithId} className="space-y-2">
      <h3 className="text-lg font-medium text-gray-700">Username</h3>
      <div className="flex flex-col items-end justify-between">
        <input
          onFocus={() => setUserNamePanel(true)}
          name="username"
          type="text"
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={oldUsername}
        />
        {userNamePanel ? <Button text="Save" /> : null}
      </div>
    </form>
  );
}
