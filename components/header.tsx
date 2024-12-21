"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TabBar() {
  return (
    <header className="flex justify-between items-center mb-10">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">JuLog</h1>
      </div>
      <Link
        href="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded-md 
               hover:bg-blue-600 transition-colors duration-300"
      >
        Login
      </Link>
    </header>
  );
}
