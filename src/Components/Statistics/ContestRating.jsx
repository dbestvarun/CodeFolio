
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
export default function ContestRating() {
  const [ratings, setRatings] = useState({
    codechef: 0,
    codeforces: 0,
    leetcode: 0,
  });
  const [selectedPlatform, setSelectedPlatform] = useState('codechef')

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
          const { codechef, codeforces, leetcode } = response.data.user;
          const response1 = await axios.get(`https://codechef-api.vercel.app/handle/${codechef}`);
          const response2 = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforces}`);
          const response3 = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${leetcode}`);
          const lc = (response3.data.rating)||0
          const cf = (response2.data.result[0].rating)
          const response4 = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforces}`);
          let cfcount = 0;
          console.log(response3.data)
          for (var i = 0; i < response4.data.result.length; i++) {
            if (response4.data.result[i].verdict === "OK") {
              cfcount += 1;
            }
          }
          cfcount += Number(response3.data.totalSolved);
          setRatings({
            codechef: response1.data.currentRating || 0,
            codeforces: response2.data.result?.[0]?.rating || 0,
            leetcode: response3.data.rating || 0,
          });
          console.log(cfcount)
          const res = await axios.post('http://localhost:5000/api/profile/ratings', {
            email: user.email,
            codeforces: cf,
            leetcode: lc,
            questions: cfcount
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Contest Rating</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold mb-6">
          {ratings[selectedPlatform]}
        </div>
        <Tabs defaultValue="codechef" className="w-full" onValueChange={setSelectedPlatform}>
          <TabsList className="grid w-full grid-cols-3"> {/* Adjusted for more tabs */}
            {Object.keys(ratings).map((platform) => (
              <TabsTrigger key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(ratings).map((platform) => (
            <TabsContent key={platform} value={platform} className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                <span className="font-semibold">{ratings[platform]}</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
