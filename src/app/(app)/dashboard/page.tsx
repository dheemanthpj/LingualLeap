
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BookMarked, Target, Zap, Languages, CheckCircle2 } from 'lucide-react';
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
import { useVocabulary } from '@/hooks/use-vocabulary';
import { useLessonProgress } from '@/hooks/use-lesson-progress';
import { allLessons, learningPaths } from '@/lib/lessons-data';
import { useProgress } from '@/hooks/use-progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';


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

function ContinueLearningCard() {
    const { isLessonCompleted } = useLessonProgress();
    const { learningLanguage } = useSettings();

    const nextLesson = allLessons.find(lesson => !isLessonCompleted(lesson.slug));
    
    const currentPath = nextLesson ? learningPaths.find(p => p.lessons.some(l => l.slug === nextLesson.slug)) : learningPaths[learningPaths.length - 1];
    
    if (!currentPath) return null;

    const completedInPath = currentPath.lessons.filter(l => isLessonCompleted(l.slug)).length;
    const totalInPath = currentPath.lessons.length;
    const pathProgress = totalInPath > 0 ? Math.round((completedInPath / totalInPath) * 100) : 0;

    return (
        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle className="font-headline">Continue Learning {learningLanguage.name}</CardTitle>
                    {nextLesson ? (
                         <CardDescription>
                            Your next lesson: <strong>{nextLesson.title}</strong>
                        </CardDescription>
                    ) : (
                        <CardDescription className="flex items-center gap-2 text-green-600">
                           <CheckCircle2 className="w-5 h-5"/> All lessons completed! Congratulations!
                        </CardDescription>
                    )}
                </div>
                {nextLesson && (
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href={`/learn/${nextLesson.slug}`}>
                            Start Lesson
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-sm font-medium">{currentPath.title} Progress</p>
                    <Progress value={pathProgress} aria-label={`${pathProgress}% complete`} />
                    <p className="text-sm text-muted-foreground">You are {pathProgress}% through this section.</p>
                </div>
            </CardContent>
        </Card>
    )
}

function WordsMasteredCard() {
  const { vocabulary } = useVocabulary();

  return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-primary"/>
            Words Mastered
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{vocabulary.length}</div>
          <p className="text-xs text-muted-foreground">
            Keep adding new words!
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild size="sm" variant="outline">
            <Link href="/vocabulary">Review vocabulary</Link>
          </Button>
        </CardFooter>
      </Card>
  )
}


export default function Dashboard() {
  const { activity } = useProgress();
  
  const today = new Date().toISOString().split('T')[0];
  const totalXpToday = activity.find(a => a.date === today)?.xp || 0;
  const dailyGoal = 50; // XP per lesson
  const dailyGoalPercentage = Math.min(100, Math.round((totalXpToday / dailyGoal) * 100));

  const last7DaysActivity = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = d.toISOString().split('T')[0];
    const dayData = activity.find(a => a.date === date);
    return {
      date,
      xp: dayData?.xp || 0,
    };
  }).reverse();


  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="col-span-full flex justify-end">
        <LanguageSelector />
      </div>

      <ContinueLearningCard />
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Target className="w-5 h-5 text-primary"/>
            Daily Goal
          </CardTitle>
          <CardDescription>Complete at least one lesson today to maintain your streak.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <div className="relative size-32">
             <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted/20" strokeWidth="2"></circle>
              <g className="origin-center -rotate-90 transform">
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  className="stroke-current text-primary transition-all duration-500" 
                  strokeWidth="2" 
                  strokeDasharray="100" 
                  strokeDashoffset={100 - dailyGoalPercentage}>
                </circle>
              </g>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-foreground">{dailyGoalPercentage}%</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{totalXpToday} / {dailyGoal} XP</p>
        </CardContent>
      </Card>

      <WordsMasteredCard />

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
            <BarChart accessibilityLayer data={last7DaysActivity}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
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
