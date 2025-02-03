import { formatToTimeAgo, ImageDeliveryURL } from "@/lib/utils";
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
    username: string;
  };
}

export default function ArticleCards({
  id,
  title,
  description,
  thumbnail,
  createdAt,
  user,
}: ListProductProps) {
  return (
    <div
      className="relative rounded-sm shadow-lg overflow-hidden 
      transform transition-all duration-300 
       hover:shadow-xl"
    >
      <Link href={`/articles/${id}`}>
        <div className="block relative w-full h-60">
          <Image
            fill
            priority
            sizes={"100"}
            src={
              thumbnail
                ? `${thumbnail}/article`
                : `${ImageDeliveryURL}bc68080a-1886-4053-2966-9223607d7600/article`
            }
            alt={title}
            className="object-cover"
          />
        </div>

        <div className="p-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {description || "No description"}
          </p>
        </div>
      </Link>
      <div className="p-3 flex justify-between items-center text-sm text-gray-500">
        <Link
          href={`/profile/${user.username}`}
          className="flex items-center gap-2"
        >
          <Image
            width={32}
            height={32}
            alt={`${user.username}'s avatar`}
            src={user.avatar || "/default-avatar.png"}
            className="w-8 h-8 rounded-full bg-gray-700"
          />
          <span>{`by ${user.username}`}</span>
        </Link>
        <span className="text-sm text-gray-500">
          {formatToTimeAgo(createdAt.toString())}
        </span>
      </div>
    </div>
  );
}
