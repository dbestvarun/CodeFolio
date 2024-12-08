"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import Tabs
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export default function RatingGraph() {
  const [codeforcesData, setCodeforcesData] = useState([]);
  const [codechefData, setCodechefData] = useState([]);
  const [activeTab, setActiveTab] = useState("codeforces");

  // Fetch Codeforces Data
  useEffect(() => {
    const fetchCodeforcesData  = async () => {
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
          const { codeforces } = response.data.user;
          const cfResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${codeforces}`);
          const rawData = cfResponse.data.result;

        const transformedData = rawData.map((contest) => ({
          date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(
            "en-US",
            { month: "short", year: "numeric" }
          ),
          rating: contest.newRating,
        }));

        setCodeforcesData(transformedData);
          
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    
    fetchCodeforcesData();
  }, []);
  // Fetch CodeChef Data
  useEffect(() => {
    const fetchCodechefData  = async () => {
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
          const { codechef } = response.data.user;
          const response1 = await axios.get(`https://codechef-api.vercel.app/handle/${codechef}`);
          console.log(response1.data);

          const ratingData = response1.data.ratingData;

          const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
          ];

          // Transform the data
          const transformedData = ratingData.map((event) => ({
            date: `${monthNames[parseInt(event.getmonth, 10) - 1]} ${parseInt(event.getday, 10)}`,
            rating: parseInt(event.rating, 10),
          }));

          setCodechefData(transformedData); // Update graph data
          // setLatestEvent(ratingData.slice(-1)[0]); // Update the most recent competition
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
      fetchCodechefData();
    }, []);

 
  

  // Graph Component
  const renderGraph = (data) => (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
        <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                labelStyle={{ color: 'var(--muted-foreground)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Competitive Programming Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="codeforces" className="space-y-4">
          {/* Tabs List */}
          <TabsList>
            <TabsTrigger value="codeforces" onClick={() => setActiveTab("codeforces")}>
              Codeforces
            </TabsTrigger>
            <TabsTrigger value="codechef" onClick={() => setActiveTab("codechef")}>
              CodeChef
            </TabsTrigger>
          </TabsList>

          {/* Codeforces Tab Content */}
          <TabsContent value="codeforces">
            {activeTab === "codeforces" && renderGraph(codeforcesData)}
          </TabsContent>

          {/* CodeChef Tab Content */}
          <TabsContent value="codechef">
            {activeTab === "codechef" && renderGraph(codechefData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
