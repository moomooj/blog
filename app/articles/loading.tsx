const Loading = () => {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex-col">
          <div className="w-full h-96 bg-neutral-700 mb-2" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-72" />
            <div className="bg-neutral-700 h-5 w-96" />
            <div className="bg-neutral-700 h-5 w-48" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
