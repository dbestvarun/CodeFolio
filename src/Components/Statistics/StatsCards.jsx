import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from 'lucide-react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
export default function StatsCards() {
  const [cc, setcc] = useState(0)
  const [cf, setcf] = useState(0)
  const [questions, setquestions] = useState(0)
  const [rank, setrank] = useState(0)
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
        const questions = response.data.user.total_questions;
        const rank = response.data.user.rank;
        setquestions(questions)
        setrank(rank)
        if (response.status === 200) {
          const { codechef, codeforces } = response.data.user;
          const response1 = await axios.get(`https://codechef-api.vercel.app/handle/${codechef}`);
          const response2 = await axios.get(`https://codeforces.com/api/user.rating?handle=${codeforces}`);
          const cf = (response2.data.result.length);
          const cc = response1.data.ratingData.length;

          setcc(cc);
          setcf(cf);
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{questions}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Contest</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{cc + cf}</div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">CodeChef</span>
              <span className="font-medium">{cc}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">CodeForces</span>
              <span className="font-medium">{cf}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">University Rank</CardTitle>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{rank}</div>
        </CardContent>
      </Card>
    </div>
  )
}

