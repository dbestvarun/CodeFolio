"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const topics = [
  { name: "Arrays", count: 166 },
  { name: "Data Structures", count: 134 },
  { name: "Algorithms", count: 70 },
  { name: "Trees", count: 60 },
  { name: "HashMap and Set", count: 51 },
  { name: "String", count: 47 },
  { name: "Sorting", count: 40 },
  { name: "Linked Lists", count: 39 },
  { name: "Dynamic Programming", count: 35 },
  { name: "Math", count: 32 },
  { name: "Greedy", count: 28 },
  { name: "Recursion", count: 25 },
  { name: "Binary Search", count: 22 },
  { name: "Stack", count: 20 },
  { name: "Queue", count: 18 }
]

export function TopicAnalysis() {
  const [showAll, setShowAll] = useState(false)
  const visibleTopics = showAll ? topics : topics.slice(0, 8)
  const maxCount = Math.max(...topics.map(t => t.count))

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">DSA Topic Analysis</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of problems solved by topic</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {visibleTopics.map((topic) => (
            <div key={topic.name} className="flex items-center gap-2">
              <div className="w-32 text-sm text-muted-foreground">{topic.name}</div>
              <div className="flex-1 h-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded" />
                <div
                  className="absolute inset-y-0 left-0 bg-primary rounded"
                  style={{
                    width: `${(topic.count / maxCount) * 100}%`
                  }}
                />
                <div className="absolute inset-y-0 left-2 text-sm text-primary-foreground">
                  {topic.count}
                </div>
              </div>
            </div>
          ))}
        </div>
        {topics.length > 8 && (
          <Button
            variant="ghost"
            className="mt-4 w-full text-sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

