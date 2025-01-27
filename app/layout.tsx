import type { Metadata } from "next";
import "./globals.css";
import LoggedInLayout from "@/components/loggedInLayout";
import LoggedOutLayout from "@/components/loggedOutLayout";
import getUserInfo from "@/lib/getUserInfo";

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
        className={`p-6 pt-28 bg-gray-50 text-black max-w-screen-2xl mx-auto `}
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
      </body>
    </html>
  );
}
