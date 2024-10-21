import { IoStatsChartOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const Sidebar = ({isSidebarOpen}) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-transform ${isSidebarOpen ? " translate-x-0": "-translate-x-full"}`}>     
        <div className='h-full px-3 pb-4 overflow-y-auto'>
            <ul className='space-y-2 font-medium'>
            <a href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <IoStatsChartOutline className="mr-3" /> 
                <span className="flex-1 me-3">Statistics</span>
                </a>
            </ul>
            <ul className='space-y-2 font-medium'>
                <a href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaCalendarAlt className="mr-3"/> 
                <span className="flex-1 me-3">Calender</span>
                </a>
            </ul>
            <ul className='space-y-2 font-medium'>
                <a href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <LuLogOut className="mr-3"/> 
                <span className="flex-1 me-3">LogOut</span>
                </a>
            </ul>
        </div>
    </aside>
  );
};

export default Sidebar