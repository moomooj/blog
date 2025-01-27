import type { Metadata } from "next";
import "./globals.css";
import LoggedInLayout from "@/components/loggedInLayout";
import LoggedOutLayout from "@/components/loggedOutLayout";
import getUserInfo from "@/lib/getUserInfo";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Devlog",
    default: "Devlog",
  },
  icons: {
    icon: "/devlogLogo.svg",
  },
  description:
    "blogging service for developers. Don't worry about where to write, start with Devlog.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();

  return (
    <html lang="en">
      <body
        className={`p-2 sm:p-6 pt-28 bg-gray-50 text-black max-w-screen-2xl mx-auto `}
      >
        {user ? (
          <>
            <LoggedInLayout user={user} />
            {children}
          </>
        ) : (
          <>
            <LoggedOutLayout />
            {children}
          </>
        )}
        <footer className="text-center pt-16 text-gray-600 text-sm">
          <p>
            <Link
              href={"/ju"}
              className=" px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400 transition-colors"
            >
              Made by Ju
            </Link>
          </p>
          <p className="mt-4">&copy; 2025 Juyoung Oh. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
