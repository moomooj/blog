"use client";

import Link from "next/link";

export default function LoggedOutLayout() {
  return (
    <header className="flex justify-between items-center mb-10">
      <nav className="flex items-center justify-between w-full">
        <Link className="text-2xl font-bold text-black" href={"/"}>
          Devlog
        </Link>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-md 
               hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
