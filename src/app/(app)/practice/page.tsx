
import { PracticeClient } from "./practice-client";
import { allLessons } from '@/lib/lessons-data';

// Flatten all phrases from all lessons
const allPhrases = allLessons.flatMap(lesson => lesson.phrases?.map(p => p.phrase) || []);


export default function PracticePage() {
  return <PracticeClient allPhrases={allPhrases} />;
}
