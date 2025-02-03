"use client";
import { useState } from "react";

interface Tag {
  id: number;
  name: string;
}

interface EditTagsProps {
  oldTags: Tag[];
}

export default function EditTags({ oldTags }: EditTagsProps) {
  const [tags, setTags] = useState<string[]>(oldTags.map((tag) => tag.name));
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, "");
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 px-3 py-1 text-white bg-blue-500 rounded-full"
        >
          <span>{tag}</span>
          <button
            type="button"
            className="text-white hover:text-gray-300"
            onClick={() => removeTag(tag)}
          >
            ×
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter tags, separated by commas"
        className="flex-1 px-2 py-1 focus:outline-none "
      />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
    </div>
  );
}
