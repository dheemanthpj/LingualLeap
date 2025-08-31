"use client"

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
import { Award, Star, TrendingUp } from "lucide-react";

const activityData = [
  { date: "2024-05-01", xp: 120 }, { date: "2024-05-02", xp: 140 },
  { date: "2024-05-03", xp: 200 }, { date: "2024-05-04", xp: 180 },
  { date: "2024-05-05", xp: 250 }, { date: "2024-05-06", xp: 230 },
  { date: "2024-05-07", xp: 300 },
]

const skillsData = [
  { skill: "Vocabulary", proficiency: 85 },
  { skill: "Grammar", proficiency: 70 },
  { skill: "Listening", proficiency: 90 },
  { skill: "Speaking", proficiency: 60 },
  { skill: "Reading", proficiency: 75 },
]

const achievements = [
  { icon: Award, title: "Streak Master", description: "7-day streak" },
  { icon: Star, title: "Word Wizard", description: "Learned 100 words" },
  { icon: TrendingUp, title: "Quick Learner", description: "Completed 5 lessons" },
  { icon: Award, title: "Perfect Pronunciation", description: "Scored 95%+" },
]

const chartConfig = {
  xp: { label: "XP", color: "hsl(var(--primary))" },
  proficiency: { label: "Proficiency", color: "hsl(var(--accent))" }
} satisfies ChartConfig;

export default function ProgressPage() {
  return (
    <div className="grid gap-6 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Activity Over Time</CardTitle>
          <CardDescription>Your total XP earned over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={activityData}
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
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Skills Breakdown</CardTitle>
            <CardDescription>Your current proficiency in different language skills.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[250px] w-full">
               <RadarChart data={skillsData}>
                <CartesianGrid gridType="circle"/>
                <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Radar name="Proficiency" dataKey="proficiency" stroke="var(--color-proficiency)" fill="var(--color-proficiency)" fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Achievements</CardTitle>
            <CardDescription>Badges you've earned on your learning journey.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {achievements.map((ach, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <div className="p-3 bg-accent/20 rounded-full">
                   <ach.icon className="w-8 h-8 text-accent" />
                </div>
                <p className="font-semibold mt-2">{ach.title}</p>
                <p className="text-xs text-muted-foreground">{ach.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
