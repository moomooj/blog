import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog ",
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
      <body className={`bg-gray-50 text-black max-w-screen-2xl mx-auto`}>
        {children}
      </body>
    </html>
  );
}
