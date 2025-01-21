"use client";

import Link from "next/link";

export default function LoggedInLayout() {
  return (
    <header className="flex justify-between items-center mb-10">
      <nav className="flex items-center justify-between w-full">
        <Link className="text-2xl font-bold text-black" href={"/"}>
          Devlog
        </Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href="/articles/add">add articles</Link>
      </nav>
    </header>
  );
}
