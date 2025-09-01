
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

const initialVocabulary: VocabularyItem[] = [];

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
