"use server";

import { z } from "zod";

const artcleSchema = z.object({
  photo: z.string(),
  title: z.string({
    required_error: "title is required",
  }),
  description: z.string({ required_error: "description is required" }),
});

export async function uploadArtcles(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const results = artcleSchema.parse(data);
  console.log(data);
}
