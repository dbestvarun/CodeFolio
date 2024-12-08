"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProgressCircles() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Problems Solved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Fundamentals</h4>
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: 251.2,
                        strokeDashoffset: 75,
                        transformOrigin: "50% 50%",
                        transform: "rotate(-90deg)",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">34</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GFG</span>
                    <span className="font-medium">34</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">DSA</h4>
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: 251.2,
                        strokeDashoffset: 125,
                        transformOrigin: "50% 50%",
                        transform: "rotate(-90deg)",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">397</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-500">Easy</span>
                    <span className="font-medium">139</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-500">Medium</span>
                    <span className="font-medium">216</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-500">Hard</span>
                    <span className="font-medium">42</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Competitive Programming</h4>
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: 251.2,
                        strokeDashoffset: 100,
                        transformOrigin: "50% 50%",
                        transform: "rotate(-90deg)",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">491</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Codechef</span>
                    <span className="font-medium">167</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Codeforces</span>
                    <span className="font-medium">324</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

