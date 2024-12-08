import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Link, Twitter, Github } from 'lucide-react'
import userLogo from "../../../public/vite.svg";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const user = (jwtDecode(Cookies.get('user')))
  // console.log(user)
  return (
    <div className="p-6 border-r min-h-screen">
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userLogo} alt="Profile picture" />
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.rollNumber}</h2>
            
          </div>
        </div>
        

        <div className="space-y-2 w-full">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Link className="h-4 w-4" />
            <span>dbestvarun</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Twitter className="h-4 w-4" />
            <span>dbestvarun</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Github className="h-4 w-4" />
            <span>dbestvarun</span>
          </div>
        </div>

        <div className="w-full pt-4">
          <h3 className="text-lg font-semibold mb-2">Overall stats</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">LeetCode</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="h-5">✓</Badge>
                <Link className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">GeeksForGeeks</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="h-5">✓</Badge>
                <Link className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">CodeChef</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="h-5">✓</Badge>
                <Link className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">CodeForces</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="h-5">✓</Badge>
                <Link className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

