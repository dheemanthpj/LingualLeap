import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

const learningPaths = [
  {
    title: "Beginner: The Essentials",
    description: "Start your journey by mastering the basics of the language.",
    progress: 35,
    lessons: [
      { slug: "common-greetings", title: "Common Greetings", completed: true },
      { slug: "introducing-yourself", title: "Introducing Yourself", completed: true },
      { slug: "basic-questions-answers", title: "Basic Questions & Answers", completed: false },
      { slug: "numbers-and-counting", title: "Numbers and Counting", completed: false },
    ],
  },
  {
    title: "Intermediate: Building Confidence",
    description: "Expand your vocabulary and start forming complex sentences.",
    progress: 0,
    lessons: [
      { slug: "ordering-food-and-drinks", title: "Ordering Food and Drinks", completed: false },
      { slug: "asking-for-directions", title: "Asking for Directions", completed: false },
      { slug: "shopping-and-bargaining", title: "Shopping and Bargaining", completed: false },
      { slug: "making-plans", title: "Making Plans", completed: false },
    ],
  },
  {
    title: "Advanced: Fluency Focus",
    description: "Dive into nuanced topics and perfect your accent.",
    progress: 0,
    lessons: [
      { slug: "discussing-hobbies-and-interests", title: "Discussing Hobbies and Interests", completed: false },
      { slug: "expressing-opinions", title: "Expressing Opinions", completed: false },
      { slug: "understanding-cultural-nuances", title: "Understanding Cultural Nuances", completed: false },
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
              <ul className="space-y-2">
                {path.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex}>
                     <Link href={`/learn/${lesson.slug}`} className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.completed && <Badge variant="outline">Completed</Badge>}
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </Link>
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
