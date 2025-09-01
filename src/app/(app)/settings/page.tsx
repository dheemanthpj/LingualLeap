
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useSettings } from "@/hooks/use-settings";
import { Slider } from "@/components/ui/slider";

export default function SettingsPage() {
  const { dailyGoal, setDailyGoal } = useSettings();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Language Settings</CardTitle>
          <CardDescription>Choose the language you want to learn.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="language">Learning Language</Label>
            <LanguageSelector />
          </div>
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Goal Settings</CardTitle>
          <CardDescription>Customize your daily learning targets.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid gap-4">
            <Label htmlFor="daily-goal">Daily XP Goal</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="daily-goal"
                min={10}
                max={200}
                step={10}
                value={[dailyGoal]}
                onValueChange={(value) => setDailyGoal(value[0])}
              />
              <span className="font-bold text-lg text-primary w-12 text-right">{dailyGoal}</span>
            </div>
          </div>
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Display Settings</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid gap-2">
            <Label htmlFor="theme">Theme</Label>
            <ThemeSwitcher />
          </div>
        </CardContent>
       </Card>
    </div>
  );
}
