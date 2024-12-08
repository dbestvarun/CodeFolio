"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContestRating() {
  const ratings = {
    codechef: 1813,
    codeforces: 1430,
    Leetcode: 0,
  }
  const [selectedPlatform, setSelectedPlatform] = useState('codechef')

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
