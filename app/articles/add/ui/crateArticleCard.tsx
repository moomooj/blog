"use client";

import Image from "next/image";
import { useState } from "react";
import CreateTags from "./createTags";

export default function CreateArticleCard() {
  const [preview, setPreview] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    if (!RegExp(/^image\/(jpe?g|png)$/).test(files[0].type)) return;
    if (2_000_000 < files[0].size) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <>
      <h2 className="text-4xl py-6">Article Preview</h2>
      <h2 className="text-lg font-semibold mt-6">Public Settings</h2>

      <div className="flex gap-4 mt-2 ">
        <button
          className={` p-2 rounded-lg  ${
            isPublic ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
          } transition`}
          onClick={() => setIsPublic(true)}
          type="button"
        >
          Public
        </button>
        <button
          className={`p-2 rounded-lg  ${
            !isPublic ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
          } transition`}
          onClick={() => setIsPublic(false)}
          type="button"
        >
          Private
        </button>
        <input type="hidden" name="published" value={String(isPublic)} />
      </div>
      <hr className="pb-4 mt-4" />
      <label
        htmlFor="thumbnail"
        className={`
                    flex max-w-xl w-full aspect-[16/9]  cursor-pointer
                     items-center justify-center bg-gray-200
                      
                  `}
      >
        {preview ? (
          <Image
            width={400}
            height={200}
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-center">
            Click to upload image
          </span>
        )}
      </label>
      <input
        type="file"
        id="thumbnail"
        name="thumbnail"
        accept="image/jpeg,image/png"
        onChange={onImageChange}
        hidden
      />
      <CreateTags />
      <textarea
        name="description"
        id="description"
        placeholder="Write your article description."
        className="w-full bg-gray-50 p-3 focus:outline-none rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        rows={3}
      />
    </>
  );
}
