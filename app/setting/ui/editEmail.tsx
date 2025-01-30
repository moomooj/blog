"use client";

import { useEffect, useRef, useState } from "react";

export default function EditEmail({
  email,
}: {
  email: string | null | undefined;
}) {
  const [emailPanel, setEmailPanel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailPanel) {
      inputRef.current?.focus();
    }
  }, [emailPanel]);

  const openEmailPanel = () => setEmailPanel(true);

  const saveEmail = () => setEmailPanel(false);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-700">Email</h3>
      {emailPanel ? (
        <div className="flex flex-col items-end">
          <input
            ref={inputRef}
            type="email"
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={email || ""}
          />
          <button
            disabled={!email}
            onClick={saveEmail}
            className="w-20 bg-blue-500 text-white h-10 rounded-md hover:bg-blue-600 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-between">
          <div className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md ">
            {email ? email : "Loading..."}
          </div>
          <button
            disabled={!email}
            className="w-20  h-10 text-blue-400 border-blue-50 border rounded-md hover:bg-blue-50 disabled:bg-neutral-100  disabled:text-neutral-300 disabled:cursor-not-allowed"
            onClick={openEmailPanel}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
