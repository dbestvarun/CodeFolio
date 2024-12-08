import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useState,useEffect } from "react";

export default function ProgressCircles() {
  const [cpQuestions, setCpQuestions] = useState({
    codechef: 0,
    codeforces: 0,
  });
  const [dsaQuestions,setDsaQuestions] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("user");
        if (!token) {
          alert("User is not authenticated.");
          return;
        }
        const user = jwtDecode(token);
        const response = await axios.post("http://localhost:5000/api/profile/info", {
          email: user.email,
        });

        if (response.status === 200) {
          console.log(response);
          const { codechef, codeforces, leetcode } = response.data.user;
          const response1 = await axios.get(`https://codechef-api.vercel.app/handle/${codechef}`);
          const response2 = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforces}`);
          const response3 = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${leetcode}`);
          
          setDsaQuestions({
            easy: response3.data.easySolved,
            medium: response3.data.mediumSolved,
            hard: response3.data.hardSolved,
          });
          
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <Card className="w-auto bg-background text-foreground">
      <CardHeader>
        <CardTitle className="text-primary">Problems Solved</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* DSA Section */}
        <div className="space-y-4 justify-between">
          <h3 className="text-primary">DSA</h3>
          <div className="flex justify-between  items-center gap-4">
            <div className="relative h-[120px] w-[120px]">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-muted"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className="stroke-green-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  strokeDasharray="283"
                  strokeDashoffset="141.5"
                />
                <circle
                  className="stroke-yellow-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(0 50 50)"
                  strokeDasharray="283"
                  strokeDashoffset="212.25"
                />
                <circle
                  className="stroke-red-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(90 50 50)"
                  strokeDasharray="283"
                  strokeDashoffset="247.625"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{dsaQuestions.easy+dsaQuestions.medium+dsaQuestions.hard}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-green-500">Easy</span>
                <span className="text-muted-foreground">{dsaQuestions.easy}</span>
              </div>
              <div className="flex gap-4 items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-yellow-500">Medium</span>
                <span className="text-muted-foreground">{dsaQuestions.medium}</span>
              </div>
              <div className="flex gap-2 items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-red-500">Hard</span>
                <span className="text-muted-foreground">{dsaQuestions.hard}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Programming Section */}
        <div className="space-y-4">
          <h3 className="text-primary">Competitive Programming</h3>
          <div className="flex justify-between items-center gap-4">
            <div className="relative h-[120px] w-[120px]">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-muted"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className="stroke-green-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  strokeDasharray="283"
                  strokeDashoffset="141.5"
                />
                <circle
                  className="stroke-yellow-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(90 50 50)"
                  strokeDasharray="283"
                  strokeDashoffset="141.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">491</span>
              </div>
            </div>
            <div className=" space-y-2">
              <div className="flex gap-4 items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-green-500">Codechef</span>
                <span className="text-muted-foreground">167</span>
              </div>
              <div className="flex gap-4 items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-yellow-500">Codeforces</span>
                <span className="text-muted-foreground">324</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

