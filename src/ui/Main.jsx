const Main = ({children,isSidebarOpen}) => {
  return (
    <div className={` h-screen  text-gray-500 bg-gray-100 p-4 sm:ml flex gap-2 flex-col lg:flex-row translate-all duration-150 mt-14 dark:bg-gray-800  ${isSidebarOpen? "translate-x-64 mr-64 ":"translate-x-0"} delay-75`}>{children}</div>
  )
}

export default Main