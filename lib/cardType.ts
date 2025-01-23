interface User {
  avatar: string | null;
  username: string | null;
}

export interface CardArticle {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: Date;
  user?: User | null;
}

export type InitialArticles = CardArticle[];
