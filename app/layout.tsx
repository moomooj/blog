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
        className={`mt-8 px-6 py-20 sm:px-2 sm:py-20 pt-28 bg-gray-50 text-black max-w-screen-2xl mx-auto `}
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
        <footer className="text-center pt-6 text-sm">
          <p className="mt-4 text-gray-300 ">
            &copy; 2025{" "}
            <Link href={"/ju"} className="text-gray-300 hover:text-gray-900">
              Juyoung Oh{" "}
            </Link>
            All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
