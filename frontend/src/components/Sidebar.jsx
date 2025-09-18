import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, UserIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-base-300">
        <Link to="/" className="flex items-center gap-3">
          <ShipWheelIcon className="size-8 text-primary" />
          <span className="text-2xl font-bold text-base-content">
            Linguify
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentPath === "/" 
              ? "bg-primary text-primary-content" 
              : "text-base-content hover:bg-base-300"
          }`}
        >
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentPath === "/friends" 
              ? "bg-primary text-primary-content" 
              : "text-base-content hover:bg-base-300"
          }`}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentPath === "/profile" 
              ? "bg-primary text-primary-content" 
              : "text-base-content hover:bg-base-300"
          }`}
        >
          <UserIcon className="size-5" />
          <span>Profile</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentPath === "/notifications" 
              ? "bg-primary text-primary-content" 
              : "text-base-content hover:bg-base-300"
          }`}
        >
          <BellIcon className="size-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-6 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs opacity-70">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
