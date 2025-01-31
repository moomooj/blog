"use client";

import Image from "next/image";
import { useState } from "react";
import { updateAvatar } from "../actions/updateAvatarAction";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import { ImageDeliveryURL } from "@/lib/utils";

export default function EditAvatar({
  avatar,
  userId,
}: {
  avatar: string | undefined;
  userId: number;
}) {
  const [preview, setPreview] = useState<string>(avatar || "");

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files || files.length === 0) return;
    if (!RegExp(/^image\/(jpe?g|png)$/).test(files[0].type)) return;
    if (2_000_000 < files[0].size) return;

    const file = files[0];

    const uploadURLResult = await getCloudflareUploadUrl();
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadURLResult.uploadURL, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    } else {
      const imageUrl = `${ImageDeliveryURL}${uploadURLResult.id}/avatar`;
      const avatarForm = new FormData();
      avatarForm.append("avatar", imageUrl);

      const result = await updateAvatar(userId, avatarForm);
      if ("ok" in result && result.ok) {
        const { avatar } = result;
        setPreview(avatar);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <label
        htmlFor="avatar"
        className={`
                    flex w-40 h-40 border-4 border-dashed rounded-full cursor-pointer
                     items-center justify-center overflow-hidden
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
            height={400}
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
        id="avatar"
        name="avatar"
        accept="image/jpeg,image/png"
        hidden
      />
    </div>
  );
}
