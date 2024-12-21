import ListArticle from "@/components/list-article";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Deep Dive into React Hooks",
      description:
        "Exploring the internal workings and optimization strategies of React hooks.",
      thumbnail: "/goguma.jpeg",
    },
    {
      id: 1,
      title: "Deep Dive into React Hooks",
      description:
        "Exploring the internal workings and optimization strategies of React hooks.",
      thumbnail: "/goguma.jpeg",
    },
    {
      id: 1,
      title: "Deep Dive into React Hooks",
      description:
        "Exploring the internal workings and optimization strategies of React hooks.",
      thumbnail: "/goguma.jpeg",
    },
    {
      id: 1,
      title: "Deep Dive into React Hooks",
      description:
        "Exploring the internal workings and optimization strategies of React hooks.",
      thumbnail: "/goguma.jpeg",
    },
    {
      id: 1,
      title: "Deep Dive into React Hooks",
      description:
        "Exploring the internal workings and optimization strategies of React hooks.",
      thumbnail: "/goguma.jpeg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <section className="flex items-center gap-8 mb-10">
        <div className="rounded-full overflow-hidden w-48 h-48">
          <img
            src="/ju_icon.png"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold mb-4">
            {"Hello, I'm a Web Developer"}
          </h2>
          <p className="text-gray-600">
            {`Primarily using React, Next.js, and TypeScript. Passionate about
            modern web technologies and clean code. In my blog, I share the
            technologies I've learned and experienced.`}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ListArticle
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            thumbnail={post.thumbnail}
            created_at={new Date()}
          />
        ))}
      </div>
    </div>
  );
}
