"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoggedInLayout() {
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
            src={``}
            className="w-14 h-14 rounded-full bg-gray-700"
          />
          {openNav ? (
            <nav className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              <Link
                className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                href="/articles/add"
              >
                Add articles
              </Link>
              <Link
                className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                href="/profile"
              >
                Profile
              </Link>
            </nav>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
