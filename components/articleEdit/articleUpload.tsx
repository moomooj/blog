"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";
import { updateArtcle, uploadArtcle } from "./action";
import { useFormState } from "react-dom";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import { ImageDeliveryURL } from "@/lib/utils";
import Image from "next/image";
import ArticleEditor from "@/components/articleEditor";

interface Article {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  content: string;
  userId: number;
  tags: {
    articleId: number;
    tagId: number;
  }[];
  user: {
    username: string;
    avatar: string;
  };
}

interface ArtcleFormProps {
  article: Article | null;
  articleNumber: number | null;
}

export default function ArtcleForm({
  article,
  articleNumber,
}: ArtcleFormProps) {
  const [preview, setPreview] = useState<string>(
    article ? `${article.thumbnail}/public` : ""
  );
  const [content, setContent] = useState<string>(
    article ? `${article.content}` : ""
  );

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

    if (!file || !(file instanceof File)) return;

    if (file.name === "") return;
    if (file.size === 0) return;

    const uploadURLResult = await getCloudflareUploadUrl();
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

    if (article) {
      return updateArtcle(articleNumber, formData);
    } else {
      return uploadArtcle(_, formData);
    }
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
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
              width={400}
              height={200}
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
            defaultValue={article ? `${article.title}` : ""}
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          defaultValue={article ? `${article.description}` : ""}
        />
      </div>
      <ArticleEditor content={content} onChange={handleChange} />
      <Button text="submit" />
    </form>
  );
}
