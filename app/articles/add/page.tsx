import Button from "@/components/button";
import Input from "@/components/input";
import { uploadArtcles } from "./action";

export default function AddArtcle() {
  return (
    <div>
      <form action={uploadArtcles} className="flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center"
        >
          <div className="text-neural-400 text-sm">add your photo</div>
        </label>
        <input type="file" id="photo" name="photo" className="hidden" />
        <Input name="title" required placeholder="Title" type="text" />
        <Input
          name="description"
          required
          placeholder="Description"
          type="text"
        />
        <Button text="Submit" />
      </form>
    </div>
  );
}
