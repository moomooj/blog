"use client";

import { logOut } from "@/lib/logout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type UserProps = {
  user: {
    avatar: string;
    username: string;
  };
};

export default function LoggedInLayout({ user }: UserProps) {
  const [openNav, setOpenNav] = useState(false);

  const openModal = () => {
    setOpenNav((prev) => !prev);
  };
  return (
    <header className="flex justify-between items-center mb-10">
      <nav className="flex items-center justify-between w-full">
        <Link className="text-2xl font-bold text-black" href={"/"}>
          Devlog
        </Link>
        <div onClick={openModal} className="relative">
          <Image
            width={2}
            height={2}
            alt="Profile"
            src={`${user.avatar}`}
            className="w-14 h-14 rounded-full bg-gray-700"
          />
          {openNav ? (
            <nav className="absolute right-0 top-full mt-2  w-48 bg-white shadow-lg rounded-sm border border-gray-200 z-10 text-xl">
              <Link
                className="block px-4 py-3 text-black hover:bg-gray-100 transition-colors"
                href={`/profile/${user.username}`}
              >
                My Devlog
              </Link>
              <Link
                className="block px-4 py-3 text-black hover:bg-gray-100 transition-colors"
                href="/articles/add"
              >
                Create Article
              </Link>

              <div
                onClick={async () => await logOut()}
                className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Log Out
              </div>
            </nav>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
