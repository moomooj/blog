import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  created_at: Date;
}
export default function ListArticle({
  id,
  title,
  description,
  thumbnail,
  created_at,
}: ListProductProps) {
  return (
    <Link
      href={`/articles/${id}`}
      className="bg-white rounded-sm shadow-lg overflow-hidden 
      transform transition-all duration-300 
       hover:shadow-xl"
    >
      <div className="h-48 overflow-hidden">
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* bottom  */}
      <div className="p-6 space-y-3 ">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        {/* meta data */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src="" className="w-8 h-8 rounded-full bg-gray-700" />
            <span>{"Author"}</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </div>
    </Link>
  );
}
