
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart
} from "@/components/ui/chart"
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  xp: { label: "XP", color: "hsl(var(--primary))" },
  proficiency: { label: "Proficiency", color: "hsl(var(--accent))" }
} satisfies ChartConfig;

export default function ProgressPage() {
  const { activity, skills, achievements } = useProgress();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div className="grid gap-6 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Activity Over Time</CardTitle>
          <CardDescription>Your total XP earned over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          {isClient ? (
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart
                accessibilityLayer
                data={activity}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="xp" stroke="var(--color-xp)" strokeWidth={3} dot={true} />
              </LineChart>
            </ChartContainer>
          ) : (
            <Skeleton className="h-[250px] w-full" />
          )}
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Skills Breakdown</CardTitle>
            <CardDescription>Your current proficiency in different language skills.</CardDescription>
          </CardHeader>
          <CardContent>
            {isClient ? (
               <ChartContainer config={chartConfig} className="h-[250px] w-full">
                 <RadarChart data={skills}>
                  <CartesianGrid gridType="circle"/>
                  <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Radar name="Proficiency" dataKey="proficiency" stroke="var(--color-proficiency)" fill="var(--color-proficiency)" fillOpacity={0.6} />
                </RadarChart>
              </ChartContainer>
            ) : (
               <Skeleton className="h-[250px] w-full" />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Achievements</CardTitle>
            <CardDescription>Badges you've earned on your learning journey.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {isClient ? achievements.map((ach, index) => (
              <div key={index} className={cn(
                  "flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg transition-opacity",
                  !ach.unlocked && "opacity-40"
                )}>
                <div className={cn(
                  "p-3 rounded-full transition-colors",
                  ach.unlocked ? "bg-accent/20" : "bg-muted"
                )}>
                   <ach.icon className={cn("w-8 h-8", ach.unlocked ? "text-accent" : "text-muted-foreground")} />
                </div>
                <p className="font-semibold mt-2 text-sm">{ach.title}</p>
                <p className="text-xs text-muted-foreground">{ach.description}</p>
              </div>
            )) : (
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full" />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
