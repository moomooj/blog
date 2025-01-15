import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog",
    default: "Julog",
  },
  description: "Juyoung Oh Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`p-6 bg-gray-50 text-black max-w-screen-2xl mx-auto `}>
        <Header />
        {children}
      </body>
    </html>
  );
}
