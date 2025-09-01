
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type LessonProgressState = {
  completedLessons: string[]; // array of lesson slugs
  completeLesson: (slug: string) => void;
  isLessonCompleted: (slug:string) => boolean;
};

// We start with no lessons completed
const initialCompletedLessons: string[] = [];

export const useLessonProgress = create<LessonProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: initialCompletedLessons,
      completeLesson: (slug) => {
        if (!get().completedLessons.includes(slug)) {
            set((state) => ({
                completedLessons: [...state.completedLessons, slug],
            }));
        }
      },
      isLessonCompleted: (slug: string) => {
        return get().completedLessons.includes(slug);
      }
    }),
    {
      name: 'lesson-progress-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
