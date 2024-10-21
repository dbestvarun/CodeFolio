import userLogo from "../../../public/vite.svg";
const User = () => {
  return (
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
        <img src={userLogo} alt="user image" className="w-12 h-12 rounded-full" />
        <div >
            <h3 className="font-semibold text-xl">UserName</h3>
            <p>JC Bose Student</p>
        </div>
    </div>
  )
}

export default User