"use client";
import { useState } from "react";
import DeleteAccount from "./components/deleteAccount";

export default function SettingsPage() {
  const [userNamePanel, setUserNamePanel] = useState(false);
  const [emailPanel, setEmailPanel] = useState(false);

  const openUserNamePanel = () => setUserNamePanel(true);
  const saveUserName = () => setUserNamePanel(false);
  const openEmailPanel = () => setEmailPanel(true);
  const saveEmail = () => setEmailPanel(false);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-300"></div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <input type="file" accept="image/*" className="cursor-pointer" />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Username</h3>
        {userNamePanel ? (
          <div className="flex flex-col items-start justify-between">
            <input
              type="text"
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={saveUserName}
              className="w-20 primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        ) : (
          <button className="text-blue-400" onClick={openUserNamePanel}>
            Edit
          </button>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Email</h3>
        {emailPanel ? (
          <div className="flex flex-col items-start">
            <input
              type="email"
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={saveEmail}
              className="w-20 bg-blue-500 text-white h-10 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <button className="text-blue-400" onClick={openEmailPanel}>
            Edit
          </button>
        )}
      </div>

      <DeleteAccount />
    </div>
  );
}
