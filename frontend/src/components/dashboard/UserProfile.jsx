import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="border-t border-gray-100 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
          {user?.initials ||
            user?.name
              ?.split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2) ||
            "U"}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-gray-900">
            {user?.name || "Guest User"}
          </p>
          <p className="truncate text-[10px] text-gray-400">
            {user?.email || ""}
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          title="Log out"
          aria-label="Log out"
          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <HiOutlineArrowRightOnRectangle className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;