import CardLoadingSkeleton from "@/components/persona/card-loading-skeleton";

const Loading = () => {
  return (
    <div className={"relative h-full space-y-2 p-4"}>
      <div
        className={
          "grid gap-4 pb-10 min-[425px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        }
      >
        {new Array(12).fill(null).map((_, index) => (
          <CardLoadingSkeleton key={`card-loading-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
