"use client";

import { useState } from "react";
import { deleteAccount } from "./deleteAccountAction";

export default function DeleteAccount() {
  const [openDeliteConfirm, setOpenDeliteConfirm] = useState(false);
  const openPanel = () => {
    setOpenDeliteConfirm((prev) => !prev);
  };

  const handleCancel = () => {
    setOpenDeliteConfirm(false);
  };
  const handleConfirm = async () => {
    await deleteAccount();
  };
  return (
    <div className="flex flex-col justify-center items-start">
      <h3 className="text-lg font-medium text-gray-700">Delete Account</h3>
      <button
        onClick={openPanel}
        className="bg-gray-200 cursor-pointer text-gray-800  py-1 px-4 rounded-md hover:bg-red-400 hover:text-white transition-colors"
      >
        Delete
      </button>
      <p className="text-gray-400 text-sm">
        When deleting your account, all your posts and comments will be
        permanently removed and cannot be recovered.
      </p>
      {openDeliteConfirm ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-gray-200 cursor-pointer text-gray-800 px-4 py-2 rounded hover:bg-red-400 hover:text-white transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 hover:text-white "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
