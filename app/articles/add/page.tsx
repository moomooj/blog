"use client";

import CreateArticleCard from "./ui/crateArticleCard";
import { useState } from "react";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { ImageDeliveryURL } from "@/lib/utils";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import Button from "@/components/button";
import { createArtcle } from "./actions/action";
import ArticleEditor from "@/components/articleEditor";

export default function AddArtcle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>("");

  const handleChange = (value: string) => {
    setContent(value);
  };

  const openCardModal = () => {
    setIsModalOpen(true);
  };
  const closeCardModal = () => {
    setIsModalOpen(false);
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("thumbnail");
    if (!file || !(file instanceof File)) {
      return;
    } else {
      if (file.size === 0 || file.name === "") {
        formData.set(
          "thumbnail",
          `${ImageDeliveryURL}bc68080a-1886-4053-2966-9223607d7600`
        );
      } else {
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
      }
    }
    return createArtcle(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <form
      action={action}
      className={`absolute flex flex-col top-0 left-0 z-50 w-full h-dvh p-6 ${
        isModalOpen ? "overflow-visible" : "overflow-hidden"
      } shadow-md rounded-lg bg-white`}
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Write your title"
        className="w-full px-3 py-2 text-4xl focus:outline-none"
      />
      <hr />
      <Input type="hidden" name="content" value={content} />
      <ArticleEditor content={content} onChange={handleChange} />
      <div className="flex items-center justify-end">
        <div
          className="primary-btn cursor-pointer w-40 p-2"
          onClick={openCardModal}
        >
          Finish
        </div>
      </div>
      <div
        className={`absolute flex justify-center p-3 bg-white ${
          isModalOpen ? "top-0" : "top-full"
        }  left-0 w-full min-h-full z-20 overflow-scroll transition-all duration-300`}
      >
        <div className="max-w-xl w-full">
          <CreateArticleCard />

          {state?.fieldErrors &&
            Object.entries(state.fieldErrors).map(([key, message]) => (
              <p key={key} className="text-red-500 text-sm mt-1">
                {message as unknown as string}
              </p>
            ))}
          <div className="flex items-center justify-end mb-7 gap-10">
            <div
              onClick={closeCardModal}
              className="w-2/5 py-2 rounded-lg cursor-pointer bg-red-500 text-white text-center hover:bg-red-300 transition-colors"
            >
              Go back
            </div>
            <Button text="submit" />
          </div>
        </div>
      </div>
    </form>
  );
}
