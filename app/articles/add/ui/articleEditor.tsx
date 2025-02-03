"use client";

import "react-quill/dist/quill.snow.css";
import React, { RefObject, useRef } from "react";
import { ImageDeliveryURL } from "@/lib/utils";
import { getCloudflareUploadUrl } from "@/lib/getCloudflareUploadUrl";
import dynamic from "next/dynamic";
import ReactQuill, { ReactQuillProps } from "react-quill";

const ReactQuillComponent = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const Component = ({
      forwardedRef,
      ...props
    }: { forwardedRef: RefObject<ReactQuill> } & ReactQuillProps) => (
      <RQ ref={forwardedRef} {...props} />
    );

    Component.displayName = "ReactQuillComponent";
    return Component;
  },
  {
    ssr: false,
  }
);

interface ArticleEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function ArticleEditor({
  content,
  onChange,
}: ArticleEditorProps) {
  const reactQuillRef: any = useRef(null);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];

        if (!/^image\/(jpe?g|png)$/.test(file.type)) {
          alert("Only JPG and PNG formats are allowed.");
          return;
        }
        if (file.size > 2_000_000) {
          alert("File size should be under 2MB.");
          return;
        }

        const uploadURLResult = await getCloudflareUploadUrl();
        const cloudflareForm = new FormData();
        cloudflareForm.append("file", file);

        const response = await fetch(uploadURLResult.uploadURL, {
          method: "POST",
          body: cloudflareForm,
        });

        if (response.ok) {
          const imageUrl = `${ImageDeliveryURL}${uploadURLResult.id}/article`;

          const editor = reactQuillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection();
            editor.insertEmbed(range?.index || 0, "image", imageUrl);
          }
        } else {
          alert("Image upload failed.");
        }
      }
    };
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
    "color",
    "background",
    "code-block",
    "align",
  ];

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          [{ align: [] }],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    []
  );

  return (
    <ReactQuillComponent
      forwardedRef={reactQuillRef}
      theme="snow"
      value={content}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="react-quill-custom"
    />
  );
}
