import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function ProgressCircles() {
  const [cpQuestions, setCpQuestions] = useState({
    codechef: 169,
    codeforces: 314,
  });
  const [dsaQuestions, setDsaQuestions] = useState({
    easy: 123,
    medium:106,
    hard: 23,
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
          const response4 = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforces}`);
          const response5 = await axios.get(`http://127.0.0.1:7000/${codechef}`);
          console.log(response5)
          const cccount = response5.data.total_problems_solved;
          let cfcount = 0;
          for (var i = 0; i < response4.data.result.length; i++) {
            if (response4.data.result[i].verdict === "OK") {
              cfcount += 1;
            }
          }
          setDsaQuestions({
            easy: response3.data.easySolved,
            medium: response3.data.mediumSolved,
            hard: response3.data.hardSolved,
          });
          setCpQuestions({
            codechef: cccount,
            codeforces: cfcount
          })

        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  let totalDsa = dsaQuestions.easy+dsaQuestions.medium+dsaQuestions.hard;
  let totalCp = cpQuestions.codechef + cpQuestions.codeforces;
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
                  strokeDasharray={`${(dsaQuestions.easy/totalDsa)*283} ${((totalDsa-dsaQuestions.easy)/totalDsa)*283}`}
                  strokeDashoffset={0}
                />
                <circle
                  className="stroke-yellow-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  strokeDasharray={`${(dsaQuestions.medium/totalDsa)*283} ${((totalDsa-dsaQuestions.medium)/totalDsa)*283}`}
                  strokeDashoffset={dsaQuestions.easy/totalDsa*-283}
                />
                <circle
                  className="stroke-red-500"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  strokeDasharray={`${(dsaQuestions.hard/totalDsa)*283} ${((totalDsa-dsaQuestions.hard)/totalDsa)*283}`}
                  strokeDashoffset={(totalDsa-dsaQuestions.hard)/totalDsa*-283}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{dsaQuestions.easy + dsaQuestions.medium + dsaQuestions.hard}</span>
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
                  transform="rotate(90 50 50)"
                  strokeDasharray={`${(cpQuestions.codechef/totalCp)*283} ${(cpQuestions.codeforces/totalCp)*283}`}
                  strokeDashoffset={0}
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
                  strokeDasharray={`${(cpQuestions.codeforces/totalCp)*283} ${(cpQuestions.codechef/totalCp)*283}`}
                  strokeDashoffset={(cpQuestions.codechef/totalCp)*-283}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{cpQuestions.codechef+cpQuestions.codeforces}</span>
              </div>
            </div>
            <div className=" space-y-2">
              <div className="flex gap-4 items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-green-500">Codechef</span>
                <span className="text-muted-foreground">{cpQuestions.codechef}</span>
              </div>
              <div className="flex gap-4 items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-yellow-500">Codeforces</span>
                <span className="text-muted-foreground">{cpQuestions.codeforces}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

