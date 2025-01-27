"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";
import { uploadArtcle } from "./action";
import { useFormState } from "react-dom";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import { ImageDeliveryURL } from "@/lib/utils";
import Image from "next/image";
import ArticleEditor from "@/components/articleEditor";

export default function AddArtcle() {
  const [preview, setPreview] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleChange = (value: string) => {
    setContent(value);
  };

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

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("thumbnail");
    const uploadURLResult = await getCloudflareUploadUrl();

    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadURLResult.uploadURL, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const imageUrl = `${ImageDeliveryURL}${uploadURLResult.id}`;
    formData.set("thumbnail", imageUrl);
    return uploadArtcle(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Create New Article
      </h1>
      <form action={action} className="space-y-6">
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Thumbnail Image
          </label>
          <label
            htmlFor="thumbnail"
            className={`
              flex w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
               items-center justify-center 
              ${
                preview
                  ? "border-transparent"
                  : "border-gray-300 hover:border-gray-400"
              }
            `}
          >
            {preview ? (
              <Image
                width={20}
                height={20}
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-center">
                Click to upload image
              </span>
            )}
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/jpeg,image/png"
            hidden
          />
        </div>
        <Input type="hidden" name="content" value={content} />
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Write your title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {state?.fieldErrors?.title && (
              <p className="text-red-500 text-sm mt-1">
                {state.fieldErrors.title}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Write more description"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <ArticleEditor content={content} onChange={handleChange} />

        <Button text="submit" />
      </form>
    </div>
  );
}
