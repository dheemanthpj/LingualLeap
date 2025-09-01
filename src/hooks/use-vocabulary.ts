import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type VocabularyItem = {
  word: string;
  translation: string;
  image: string;
  dataAiHint: string;
};

type VocabularyState = {
  vocabulary: VocabularyItem[];
  addWord: (word: VocabularyItem) => void;
};

const initialVocabulary: VocabularyItem[] = [
    { word: "Hola", translation: "Hello", image: "https://picsum.photos/400/200?random=1", dataAiHint: "greeting wave" },
    { word: "Gracias", translation: "Thank you", image: "https://picsum.photos/400/200?random=2", dataAiHint: "gratitude hands" },
    { word: "Adiós", translation: "Goodbye", image: "https://picsum.photos/400/200?random=3", dataAiHint: "waving goodbye" },
    { word: "Por favor", translation: "Please", image: "https://picsum.photos/400/200?random=4", dataAiHint: "polite gesture" },
    { word: "Sí", translation: "Yes", image: "https://picsum.photos/400/200?random=5", dataAiHint: "thumbs up" },
    { word: "No", translation: "No", image: "https://picsum.photos/400/200?random=6", dataAiHint: "shaking head" },
];

export const useVocabulary = create<VocabularyState>()(
  persist(
    (set) => ({
      vocabulary: initialVocabulary,
      addWord: (word) =>
        set((state) => ({
          vocabulary: [...state.vocabulary, word],
        })),
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
