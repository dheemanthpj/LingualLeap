import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Language = {
  name: string;
  code: string;
  flag: string; // emoji
};

export const supportedLanguages: Language[] = [
  { name: 'Spanish', code: 'es-ES', flag: '🇪🇸' },
  { name: 'French', code: 'fr-FR', flag: '🇫🇷' },
  { name: 'German', code: 'de-DE', flag: '🇩🇪' },
  { name: 'Italian', code: 'it-IT', flag: '🇮🇹' },
  { name: 'Japanese', code: 'ja-JP', flag: '🇯🇵' },
];

type SettingsState = {
  learningLanguage: Language;
  setLearningLanguage: (language: Language) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      learningLanguage: supportedLanguages[0], // Default to Spanish
      setLearningLanguage: (language) => set({ learningLanguage: language }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
