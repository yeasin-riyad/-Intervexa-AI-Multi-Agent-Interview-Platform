import { HiOutlineBell } from "react-icons/hi2";

const DashboardHeader = ({ user, onMenuClick }) => {
  return (
    <header className="mb-7 flex items-center justify-between gap-4 border-b border-gray-200 pb-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-700 transition hover:bg-gray-100 lg:hidden"
        >
          <span aria-hidden="true">☰</span>
        </button>

        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-400">Overview</p>
          <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Hello, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="mt-2 hidden text-sm text-gray-500 sm:block">
            Here&apos;s your interview preparation progress.
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-gray-600 transition hover:bg-gray-100"
      >
        <HiOutlineBell />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-white" />
      </button>
    </header>
  );
};

export default DashboardHeader;