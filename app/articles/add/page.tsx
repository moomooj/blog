"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { uploadArtcle } from "./action";
import { useFormState } from "react-dom";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import { ImageDeliveryURL } from "@/lib/utils";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
    const { id, uploadURL } = await getCloudflareUploadUrl();
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadURL, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const imageUrl = `${ImageDeliveryURL}${id}`;
    formData.set("thumbnail", imageUrl);
    return uploadArtcle(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
    <div>
      <form action={action}>
        <label htmlFor="thumbnail">
          <div
            className="text-neural-400 text-sm"
            style={{ backgroundImage: `url(${preview})` }}
          >
            Add your photo.
          </div>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="thumbnail"
          name="thumbnail"
          hidden
        />
        <Input type="hidden" name="content" value={content} />
        <Input
          type="text"
          name="title"
          placeholder="write your title"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="description"
          required
          placeholder="write more description"
          type="text"
        />
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }],
              ["bold", "italic", "strike"],
              [{ align: [] }],
              ["link", "image"],
              ["blockquote", "code-block"],
            ],
          }}
        />
        <Button text="작성완료" />
      </form>
    </div>
  );
}
