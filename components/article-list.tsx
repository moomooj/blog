"use client";

import { InitialArtcles } from "@/app/page";
import ListArticle from "./list-article";
import { useEffect, useRef, useState } from "react";
import { getMoreArticles } from "@/app/actions";

interface ArtcleListProrps {
  initialArtcles: InitialArtcles;
}

export default function ArticleList({ initialArtcles }: ArtcleListProrps) {
  const [artcles, setArtcles] = useState(initialArtcles);
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
          const newArtcles = await getMoreArticles(page + 1);
          if (newArtcles.length !== 0) {
            setPage((prev) => prev + 1);
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
      {artcles.map((artcle) => (
        <ListArticle key={artcle.id} {...artcle} />
      ))}

      {!isLastPage ? (
        <span
          ref={trigger}
          className=" mt-[300vh] mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "Loading" : "Load more"}
        </span>
      ) : null}
    </>
  );
}
