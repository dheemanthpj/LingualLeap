"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BookMarked, Target, Zap, Languages } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "@/components/ui/chart";
import { useSettings, supportedLanguages, type Language } from '@/hooks/use-settings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';


const chartData = [
  { day: 'Mon', xp: 50 },
  { day: 'Tue', xp: 75 },
  { day: 'Wed', xp: 120 },
  { day: 'Thu', xp: 90 },
  { day: 'Fri', xp: 150 },
  { day: 'Sat', xp: 130 },
  { day: 'Sun', xp: 180 },
];

const chartConfig = {
  xp: {
    label: 'XP',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

function LanguageSelector() {
  const { learningLanguage, setLearningLanguage } = useSettings();

  const handleLanguageChange = (code: string) => {
    const language = supportedLanguages.find(l => l.code === code);
    if (language) {
      setLearningLanguage(language);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto gap-2">
           {learningLanguage.flag}
           <span className="hidden sm:inline">{learningLanguage.name}</span>
           <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select a Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={learningLanguage.code} onValueChange={handleLanguageChange}>
          {supportedLanguages.map(lang => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              <span className="flex items-center gap-2">{lang.flag} {lang.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default function Dashboard() {
  const { learningLanguage } = useSettings();
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="col-span-full flex justify-end">
        <LanguageSelector />
      </div>

      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle className="font-headline">Continue Learning {learningLanguage.name}</CardTitle>
            <CardDescription>
              Your last lesson: <strong>Beginner - Common Greetings</strong>
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/learn">
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Lesson Progress</p>
            <Progress value={45} aria-label="45% complete" />
            <p className="text-sm text-muted-foreground">You are 45% through this lesson.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Target className="w-5 h-5 text-primary"/>
            Daily Goal
          </CardTitle>
          <CardDescription>You're on a roll! Keep it up to maintain your streak.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <div className="relative size-32">
             <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted/20" strokeWidth="2"></circle>
              <g className="origin-center -rotate-90 transform">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-primary" strokeWidth="2" strokeDasharray="100" strokeDashoffset="25"></circle>
              </g>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-foreground">75%</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">150 / 200 XP</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-primary"/>
            Words Mastered
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">1,250</div>
          <p className="text-xs text-muted-foreground">
            +50 from last week
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild size="sm" variant="outline">
            <Link href="/vocabulary">Review vocabulary</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary"/>
            Weekly Activity
          </CardTitle>
          <CardDescription>
            XP gained over the last 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis hide/>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="xp" fill="var(--color-xp)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
