import type { Metadata } from "next";
import "./globals.css";
import LoggedInLayout from "@/components/loggedInLayout";
import LoggedOutLayout from "@/components/loggedOutLayout";
import getSession from "@/lib/session";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog",
    default: "Devlog",
  },
  description:
    "blogging service for developers. Don't worry about where to write, start with Devlog.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`p-6 bg-gray-50 text-black max-w-screen-2xl mx-auto `}>
        {session.id ? (
          <>
            <LoggedInLayout />
            {children}
          </>
        ) : (
          <>
            <LoggedOutLayout />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
