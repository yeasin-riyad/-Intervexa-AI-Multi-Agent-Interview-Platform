import { motion, AnimatePresence } from "motion/react";
import {
  HiOutlineDocumentText,
  HiOutlineMap,
  HiOutlineStar,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineSquares2X2,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

import { dashboardAgents, demoUser } from "../../data/dashboardData";
import UserProfile from "./UserProfile";

const DashboardSidebar = ({
  user,
  isOpen,
  onClose,
  onCreateInterview,
  onLogout,
}) => {
  const navigation = [
    { label: "Dashboard", icon: HiOutlineSquares2X2, active: true },
    ...dashboardAgents,
  ];

  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Brand */}
      <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-xl text-white shadow-lg shadow-black/10">
            <HiOutlineSparkles />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-gray-950">
            Intervexa<span className="text-violet-600">AI</span>
          </span>
        </a>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <HiOutlineXMark className="text-xl" />
        </button>
      </div>

      {/* Create interview */}
      <div className="shrink-0 px-4 pt-5">
        <button
          type="button"
          onClick={onCreateInterview}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-violet-700"
        >
          <HiOutlinePlus className="text-lg" />
          Create Interview
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.label === "Dashboard") onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  item.active
                    ? "bg-gray-100 font-semibold text-gray-950"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                }`}
              >
                <Icon className="shrink-0 text-xl" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Interview coins */}
      <div className="shrink-0 px-4 pb-4">
        <div className="rounded-xl bg-gradient-to-br from-[#292929] to-black p-4 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineCurrencyDollar className="text-xl text-amber-300" />
              <p className="text-[10px] font-bold tracking-wide text-white/60">
                INTERVIEW COINS
              </p>
            </div>
            <button
              type="button"
              onClick={onCreateInterview}
              aria-label="Get more interview coins"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-lg transition hover:bg-white/25"
            >
              +
            </button>
          </div>

          <p className="mt-2 text-lg font-bold">
            {user?.interviewCoins ?? demoUser.interviewCoins}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <UserProfile user={user} onLogout={onLogout} />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] border-r border-gray-200 bg-white lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 cursor-default bg-black/40 backdrop-blur-[2px] lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(290px,85vw)] overflow-hidden border-r border-gray-200 bg-white shadow-2xl lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;