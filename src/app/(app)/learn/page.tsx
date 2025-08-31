import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

const learningPaths = [
  {
    title: "Beginner: The Essentials",
    description: "Start your journey by mastering the basics of the language.",
    progress: 35,
    lessons: [
      { title: "Common Greetings", completed: true },
      { title: "Introducing Yourself", completed: true },
      { title: "Basic Questions & Answers", completed: false },
      { title: "Numbers and Counting", completed: false },
    ],
  },
  {
    title: "Intermediate: Building Confidence",
    description: "Expand your vocabulary and start forming complex sentences.",
    progress: 0,
    lessons: [
      { title: "Ordering Food and Drinks", completed: false },
      { title: "Asking for Directions", completed: false },
      { title: "Shopping and Bargaining", completed: false },
      { title: "Making Plans", completed: false },
    ],
  },
  {
    title: "Advanced: Fluency Focus",
    description: "Dive into nuanced topics and perfect your accent.",
    progress: 0,
    lessons: [
      { title: "Discussing Hobbies and Interests", completed: false },
      { title: "Expressing Opinions", completed: false },
      { title: "Understanding Cultural Nuances", completed: false },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
        {learningPaths.map((path, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="border-b-0 rounded-lg overflow-hidden shadow-sm">
            <AccordionTrigger className="bg-card p-6 hover:bg-accent/50 data-[state=open]:rounded-b-none transition-all text-left">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold font-headline">{path.title}</h3>
                  <Badge variant={path.progress > 0 ? "secondary" : "outline"} className="text-secondary-foreground">{path.progress}% Complete</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-card p-6 -mt-1">
              <ul className="space-y-4">
                {path.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex} className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    {lesson.completed && <Badge variant="outline">Completed</Badge>}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
