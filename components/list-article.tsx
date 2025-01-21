import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: Date;
  user: {
    avatar: string | null;
  };
}

export default function ListArticle({
  id,
  title,
  description,
  thumbnail,
  createdAt,
  user,
}: ListProductProps) {
  return (
    <Link
      href={`/articles/${id}`}
      className=" rounded-sm shadow-lg overflow-hidden 
      transform transition-all duration-300 
       hover:shadow-xl"
    >
      <div className=" block relative w-full h-60">
        <Image
          fill
          src={thumbnail ? `${thumbnail}/public` : ""}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="p-3 space-y-3 ">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {description ? description : "No description"}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Image
              width={2}
              height={2}
              alt="Profile"
              src={`${user.avatar}`}
              className="w-8 h-8 rounded-full bg-gray-700"
            />
            <span>{"Author"}</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatToTimeAgo(createdAt.toString())}
          </span>
        </div>
      </div>
    </Link>
  );
}

/*


      
  */
