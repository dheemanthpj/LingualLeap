
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

   useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
     <div className="flex gap-2">
        <Button 
            variant={theme === 'light' ? 'default' : 'outline'} 
            onClick={() => theme !== 'light' && toggleTheme()}
            className="w-full"
        >
            <Sun className="w-4 h-4 mr-2" /> Light
        </Button>
        <Button 
            variant={theme === 'dark' ? 'default' : 'outline'} 
            onClick={() => theme !== 'dark' && toggleTheme()}
            className="w-full"
        >
            <Moon className="w-4 h-4 mr-2" /> Dark
        </Button>
    </div>
  )
}
