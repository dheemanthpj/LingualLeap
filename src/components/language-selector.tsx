
"use client";

import { useSettings, supportedLanguages } from '@/hooks/use-settings';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

export function LanguageSelector() {
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
        <Button variant="outline" className="w-full sm:w-auto justify-between sm:justify-start gap-2">
           <span className="flex items-center gap-2">
             {learningLanguage.flag}
             {learningLanguage.name}
           </span>
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
