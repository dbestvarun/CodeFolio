"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const generateMockData = () => {
  const data = []
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1)
  const endDate = new Date()

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5)
    })
  }
  return data
}

const contributions = generateMockData()

const getColorClass = (count) => {
  if (count === 0) return "bg-gray-100"
  if (count < 2) return "bg-green-100"
  if (count < 4) return "bg-green-300"
  return "bg-green-500"
}

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function ActivityHeatmap() {
  const weeks = []
  let currentWeek = []

  const firstDate = new Date(contributions[0].date)
  const firstDay = firstDate.getDay()

  // Add empty cells for the days before the first contribution
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null)
  }

  contributions.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  // Add any remaining days to the last week
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">963 submissions in past 6 months</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm">Max.Streak</span>
            <span className="font-bold">43</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm">Current.Streak</span>
            <span className="font-bold">13</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="flex flex-col text-xs text-muted-foreground mr-2 mt-6 justify-between">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div>
            <div className="flex mb-2 text-xs text-muted-foreground justify-between">
              {monthLabels.map((month, i) => (
                <span key={i}>{month}</span>
              ))}
            </div>
            <div className="grid grid-flow-col gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.map((day, dayIndex) => (
                    <TooltipProvider key={dayIndex}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`w-3 h-3 rounded-sm ${
                              day ? getColorClass(day.count) : "bg-gray-100"
                            }`}
                          />
                        </TooltipTrigger>
                        {day && (
                          <TooltipContent>
                            <p>{day.count} contributions on {day.date}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

