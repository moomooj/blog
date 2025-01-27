"use client";
import ArtcleForm from "@/components/articleUpload/articleUpload";
export default function AddArtcle() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Create New Article
      </h1>
      <ArtcleForm article={null} articleNumber={null} />
    </div>
  );
}
