import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Leaderboard() {
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("user");
        if (!token) {
          alert("User is not authenticated.");
          return;
        }

        const user = jwtDecode(token);
        const response = await axios.get("http://localhost:5000/users/questions");
        console.log(response);
        setLeaderboardData(response.data.users);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...leaderboardData];

    // Add calculatedScore to each user, with defaults for missing values
    sortableItems = sortableItems.map(user => {
      const cf_rating = user.cf_rating || 0; // Default to 0 if cf_rating is missing
      const total_questions = user.total_questions || 0; // Default to 0 if total_questions is missing
      const calculatedScore = (cf_rating * 2.5) + (total_questions * 3.5);

      console.log(`User: ${user.email}, cf_rating: ${cf_rating}, total_questions: ${total_questions}, calculatedScore: ${calculatedScore}`);

      return {
        ...user,
        cf_rating,
        total_questions,
        calculatedScore
      };
    });

    // Sort by calculatedScore in descending order
    sortableItems.sort((a, b) => b.calculatedScore - a.calculatedScore);

    // Assign ranks based on sorted order
    sortableItems = sortableItems.map((user, index) => ({
      ...user,
      rank: index + 1 // Rank starts from 1
    }));

    return sortableItems;
  }, [leaderboardData]);



  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>University Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">
                  <Button variant="ghost" onClick={() => requestSort('rank')}>
                    Rank
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">
                  <Button variant="ghost" onClick={() => requestSort('calculatedScore')}>
                    Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-4 py-2 text-left">
                  <Button variant="ghost" onClick={() => requestSort('cf_rating')}>
                    Cf Rating
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-4 py-2 text-left">
                  <Button variant="ghost" onClick={() => requestSort('total_questions')}>
                    Questions Solved
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((user) => (
                <tr key={user.rank} className="border-b last:border-b-0">
                  <td className="px-4 py-2">
                    <span className="font-semibold">{user.rank}</span>
                    {user.rank <= 3 && (
                      <Badge variant="outline" className="ml-2">
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.email || 'User Avatar'} />
                        <AvatarFallback>
                          {user.email
                            ? user.email.split('@')[0].slice(-2)
                            : '??'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.email || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="secondary">{user.calculatedScore}</Badge>
                  </td>
                  <td className="px-4 py-2">{user.cf_rating}</td>
                  <td className="px-4 py-2">{user.total_questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
