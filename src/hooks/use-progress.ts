"use client";

import * as React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useVocabulary } from './use-vocabulary';
import { useLessonProgress } from './use-lesson-progress';
import { Award, Star, TrendingUp, BookCheck } from 'lucide-react';
import type { Icon } from 'lucide-react';

const XP_PER_LESSON = 50;

type Skill = {
  skill: string;
  proficiency: number;
}

type Achievement = {
  id: string;
  icon: Icon;
  title: string;
  description: string;
  unlocked: boolean;
  goal: number;
}

type Activity = {
  date: string;
  xp: number;
}

type ProgressState = {
  activity: Activity[];
  skills: Skill[];
  achievements: Achievement[];
  addActivity: (lessonsCompleted: number) => void;
  updateSkills: (lessonsCompleted: number) => void;
  checkAchievements: (lessonsCompleted: number, wordsMastered: number) => void;
};

const initialAchievements: Achievement[] = [
  { id: "learner1", icon: TrendingUp, title: "First Steps", description: "Complete 1 lesson", unlocked: false, goal: 1 },
  { id: "learner2", icon: TrendingUp, title: "Quick Learner", description: "Complete 5 lessons", unlocked: false, goal: 5 },
  { id: "learner3", icon: BookCheck, title: "Bookworm", description: "Complete 10 lessons", unlocked: false, goal: 10 },
  { id: "vocab1", icon: Star, title: "Word Collector", description: "Learn 10 words", unlocked: false, goal: 10 },
  { id: "vocab2", icon: Star, title: "Word Wizard", description: "Learn 50 words", unlocked: false, goal: 50 },
  { id: "streak1", icon: Award, title: "Streak Starter", description: "7-day streak", unlocked: false, goal: 7 },
];

const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      activity: [],
      skills: [
        { skill: "Vocabulary", proficiency: 10 },
        { skill: "Grammar", proficiency: 10 },
        { skill: "Listening", proficiency: 10 },
        { skill: "Speaking", proficiency: 10 },
        { skill: "Reading", proficiency: 10 },
      ],
      achievements: initialAchievements,
      addActivity: (lessonsCompleted) => {
        const today = new Date().toISOString().split('T')[0];
        set(state => {
            const newActivity = [...state.activity];
            const todayEntry = newActivity.find(a => a.date === today);
            if (todayEntry) {
                todayEntry.xp = lessonsCompleted * XP_PER_LESSON;
            } else {
                newActivity.push({ date: today, xp: lessonsCompleted * XP_PER_LESSON });
            }
            // Keep only last 7 days
            return { activity: newActivity.slice(-7) };
        });
      },
      updateSkills: (lessonsCompleted) => {
         set(state => ({
            skills: state.skills.map(skill => ({
                ...skill,
                proficiency: Math.min(100, 10 + lessonsCompleted * 5) // Simple linear progression
            }))
         }))
      },
      checkAchievements: (lessonsCompleted, wordsMastered) => {
        set(state => ({
            achievements: state.achievements.map(ach => {
                if (ach.unlocked) return ach;
                
                let completed = false;
                if(ach.id.startsWith("learner")) {
                    completed = lessonsCompleted >= ach.goal;
                } else if (ach.id.startsWith("vocab")) {
                    completed = wordsMastered >= ach.goal;
                }
                
                return { ...ach, unlocked: completed };
            })
        }))
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// This hook provides a reactive layer on top of the store
// to automatically update progress when dependencies change.
export const useProgress = () => {
    const { activity, skills, achievements, addActivity, updateSkills, checkAchievements } = useProgressStore();
    const { completedLessons } = useLessonProgress();
    const { vocabulary } = useVocabulary();

    const lessonsCompletedCount = completedLessons.length;
    const wordsMasteredCount = vocabulary.length;

    // React to changes in lessons and vocabulary
    // Using useEffect to call store actions when dependent state changes
    // This is a common pattern for zustand when you need to derive state updates
    // from other stores.
    React.useEffect(() => {
        addActivity(lessonsCompletedCount);
        updateSkills(lessonsCompletedCount);
        checkAchievements(lessonsCompletedCount, wordsMasteredCount);
    }, [lessonsCompletedCount, wordsMasteredCount, addActivity, updateSkills, checkAchievements]);

    return { activity, skills, achievements };
}
