
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function SettingsPage() {
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
