"use client";

import { logOut } from "@/components/logout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserProps = {
  user: {
    avatar: string;
    username: string;
  };
};

export default function LoggedInLayout({ user }: UserProps) {
  const [openNav, setOpenNav] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollY = 0;

  const openModal = () => {
    setOpenNav((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-gray-50 py-5 px-5 transition-transform duration-300 z-50 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between w-full max-w-screen-2xl m-auto ">
        <Link className="text-2xl font-bold text-black" href={"/"}>
          Devlog
        </Link>
        <div onClick={openModal} className="relative">
          <Image
            width={400}
            height={400}
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
              <Link
                className="block px-4 py-3 text-black hover:bg-gray-100 transition-colors"
                href="/setting"
              >
                Setting
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
