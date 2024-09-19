"use client";

import Link from "next/link";

export default function TabBar() {
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-4 border-neutral-600 border-t px-5 py-3 *:text-white">
      <Link href="/" className="flex flex-col items-center gap-px">
        <span>Home</span>
      </Link>
      <Link href="/articles" className="flex flex-col items-center gap-px">
        <span>Blog</span>
      </Link>
      <Link href="/about" className="flex flex-col items-center gap-px">
        <span>about</span>
      </Link>
      <Link href="/the-team" className="flex flex-col items-center gap-px">
        <span>The Team</span>
      </Link>
    </div>
  );
}
