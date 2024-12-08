"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Nov 1", rating: 1000 },
  { date: "Nov 5", rating: 1100 },
  { date: "Nov 10", rating: 1250 },
  { date: "Nov 15", rating: 1400 },
  { date: "Nov 20", rating: 1500 },
  { date: "Nov 25", rating: 1600 },
  { date: "Nov 27", rating: 1812 },
]

export default function RatingGraph() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">Rating</CardTitle>
          <p className="text-sm text-muted-foreground">27 Nov 2024</p>
        </div>
        <div className="text-sm">
          <div>Starters 162 (Rated)</div>
          <div className="text-muted-foreground">Rank: 333</div>
        </div>
      </CardHeader>
      <CardContent>
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
              <Tooltip />
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
      </CardContent>
    </Card>
  )
}

