
const RoadmapSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-white/10 bg-[#151827] p-5"
        >
          <div className="mb-5 flex justify-between">
            <div className="h-12 w-12 rounded-xl bg-white/10" />
            <div className="h-6 w-24 rounded-full bg-white/10" />
          </div>

          <div className="h-5 w-3/4 rounded bg-white/10" />
          <div className="mt-3 h-3 w-full rounded bg-white/10" />
          <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />

          <div className="my-6 grid grid-cols-2 gap-3">
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-20 rounded-xl bg-white/5" />
          </div>

          <div className="h-8 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
};

export default RoadmapSkeleton;
