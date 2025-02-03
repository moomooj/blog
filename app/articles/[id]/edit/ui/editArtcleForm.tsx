"use client";
import ArticleEditor from "@/app/articles/add/ui/articleEditor";
import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import { useFormState } from "react-dom";
import EditArticleCard from "./editArticleCard";
import { ImageDeliveryURL } from "@/lib/utils";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import { UpdateArtcle } from "../actions/action";

interface Article {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  content: string;
  userId: number;
  published: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  user: {
    username: string;
    avatar: string;
  };
}

interface ArtcleFormProps {
  article: Article;
  articleNumber: number;
}

export default function EditArtcleForm({
  article,
  articleNumber,
}: ArtcleFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>(article.content);

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
          article.thumbnail
            ? article.thumbnail
            : `${ImageDeliveryURL}bc68080a-1886-4053-2966-9223607d7600`
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

    return UpdateArtcle(articleNumber, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <form
      action={action}
      className={`absolute flex flex-col top-0 left-0 z-50 w-full h-dvh p-6 ${
        isModalOpen ? "overflow-visible" : "overflow-hidden"
      } shadow-md rounded-lg bg-white`}
    >
      <Input
        type="text"
        name="title"
        id="title"
        placeholder="Write your title"
        className="w-full px-3 py-2 text-4xl focus:outline-none"
        defaultValue={article.title}
      />
      <hr />
      <input type="hidden" name="content" value={content} />
      <ArticleEditor content={content} onChange={handleChange} />
      <div className="flex items-center justify-end">
        <div
          className="primary-btn cursor-pointer w-40 p-2"
          onClick={openCardModal}
        >
          Finish
        </div>
      </div>
      <div
        className={`absolute flex justify-center p-3 bg-white ${
          isModalOpen ? "top-0" : "top-full"
        }  left-0 w-full min-h-full z-20 overflow-scroll transition-all duration-300`}
      >
        <div className="max-w-xl w-full">
          <EditArticleCard
            description={article.description}
            thumbnail={article.thumbnail}
            published={article.published}
            tags={article.tags}
          />

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
