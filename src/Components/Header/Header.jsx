import { FaMoon, FaSun } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg"; // Import profile icon

const Header = ({ toggleDarkMode, darkMode, toggleSidebar, handleLogout }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <a href="#" className="flex ms-2 md:me-24">
              <MdSpaceDashboard className="h-8 me-3 text-xl text-green-500" />
              <a href="/" className="self-center text-xl sm:text-2xl whitespace-nowrap dark:text-white font-semibold">
                CodeFolio
              </a>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Profile Link */}
            <a
              href="/profile"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              title="Profile"
            >
              <CgProfile className="text-2xl" />
            </a>

            {/* Logout Button */}
            <button
              className="dark:bg-slate-100 dark:text-slate-700 rounded-full p-2"
              onClick={handleLogout}
              title="Logout"
            >
              <LuLogOut />
            </button>

            {/* Dark Mode Toggle */}
            <button
              className="dark:bg-slate-50 dark:text-slate-700 rounded-full p-2"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
