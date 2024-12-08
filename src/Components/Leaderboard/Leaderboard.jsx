"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from 'lucide-react'

const leaderboardData = [
  { rank: 1, name: "John Doe", score: 9850, activeDays: 120, questionsSolved: 450, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 2, name: "Jane Smith", score: 9720, activeDays: 115, questionsSolved: 430, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 3, name: "Bob Johnson", score: 9680, activeDays: 118, questionsSolved: 440, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 4, name: "Alice Williams", score: 9550, activeDays: 110, questionsSolved: 420, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 5, name: "Charlie Brown", score: 9420, activeDays: 105, questionsSolved: 400, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 6, name: "Diana Davis", score: 9380, activeDays: 108, questionsSolved: 410, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 7, name: "Ethan Edwards", score: 9310, activeDays: 100, questionsSolved: 390, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 8, name: "Fiona Foster", score: 9280, activeDays: 102, questionsSolved: 395, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 9, name: "George Green", score: 9150, activeDays: 98, questionsSolved: 380, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 10, name: "Hannah Hill", score: 9020, activeDays: 95, questionsSolved: 370, avatar: "/placeholder.svg?height=32&width=32" },
]

export default function Leaderboard() {
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...leaderboardData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

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
        <CardTitle>Global Leaderboard</CardTitle>
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
                  <Button variant="ghost" onClick={() => requestSort('score')}>
                    Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-4 py-2 text-left">
                  <Button variant="ghost" onClick={() => requestSort('activeDays')}>
                    Active Days
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-4 py-2 text-left">
                  <Button variant="ghost" onClick={() => requestSort('questionsSolved')}>
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
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="secondary">{user.score}</Badge>
                  </td>
                  <td className="px-4 py-2">{user.activeDays}</td>
                  <td className="px-4 py-2">{user.questionsSolved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

