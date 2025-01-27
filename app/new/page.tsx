import ArticleList from "@/components/article-list";
import { Metadata } from "next";
import { getInitialArticles } from "./actions";
import NavLinks from "@/components/navLinks";

export const metadata: Metadata = {
  title: "Devlog",
};

export default async function Home() {
  const initialArticles = await getInitialArticles();

  return (
    <div className="max-w-6xl mx-auto">
      <NavLinks />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleList initialArticles={initialArticles} />
      </div>
    </div>
  );
}
