import userLogo from "../../../public/vite.svg";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
const User = () => {
  const user = (jwtDecode(Cookies.get('user')))
  return (
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
      <img src={userLogo} alt="user image" className="w-12 h-12 rounded-full" />
      <div >
        <h3 className="font-semibold text-xl">{user.rollNumber}</h3>
        <p>JC Bose Student</p>
      </div>
    </div>
  )
}

export default User