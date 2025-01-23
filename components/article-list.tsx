"use client";

import { InitialArticles } from "@/app/actions";
import ListArticle from "./list-article";
import { useEffect, useRef, useState } from "react";
import { getMoreArticles } from "@/app/actions";
import { InfinityScrollCardNumber } from "@/lib/utils";

interface ArtcleListProrps {
  initialArticles: InitialArticles;
}

export default function ArticleList({ initialArticles }: ArtcleListProrps) {
  const [artcles, setArtcles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setisLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const elemet = entries[0];

        if (elemet.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newArtcles = await getMoreArticles(
            page + InfinityScrollCardNumber
          );
          if (newArtcles.length !== 0) {
            setPage((prev) => prev + InfinityScrollCardNumber);
            setArtcles((prev) => [...prev, ...newArtcles]);
          } else {
            setisLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0 }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);
  return (
    <>
      {artcles.map((article) => (
        <ListArticle key={article.id} {...article} />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          className="mb-96 text-sm font-semibold w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "Loading" : ""}
        </span>
      ) : (
        "no more article"
      )}
    </>
  );
}
