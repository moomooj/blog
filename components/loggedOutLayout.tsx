"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoggedOutLayout() {
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollY = 0;

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
