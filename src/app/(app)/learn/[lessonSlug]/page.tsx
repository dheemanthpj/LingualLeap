import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, Mic, Volume2 } from "lucide-react";
import Link from "next/link";

// This is mock data. In a real application, you'd fetch this based on the lessonSlug.
const lessonDetails = {
  title: "Common Greetings",
  introduction: "Let's learn some essential greetings you can use in everyday conversations. These are fundamental for starting any interaction.",
  phrases: [
    { phrase: "Hola", translation: "Hello", pronunciation: "OH-lah" },
    { phrase: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nohs DEE-ahs" },
    { phrase: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-moh es-TAHS" },
    { phrase: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOHS" },
  ],
  quiz: [
    { 
      question: "How do you say 'Hello'?",
      options: ["Adiós", "Hola", "Gracias"],
      answer: "Hola"
    },
     { 
      question: "What does 'Buenos días' mean?",
      options: ["Good evening", "Good afternoon", "Good morning"],
      answer: "Good morning"
    }
  ]
};

export default function LessonPage({ params }: { params: { lessonSlug: string } }) {
  // You can use params.lessonSlug to fetch the correct lesson data
  const { title, introduction, phrases, quiz } = lessonDetails;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/learn"><ChevronLeft className="w-4 h-4 mr-2" /> Back to Lessons</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">{introduction}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Phrases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {phrases.map((item, index) => (
            <div key={index} className="flex flex-wrap items-center justify-between p-4 rounded-md bg-muted/50">
              <div>
                <p className="text-xl font-bold">{item.phrase}</p>
                <p className="text-muted-foreground">{item.translation}</p>
                <p className="text-sm text-primary font-medium">{item.pronunciation}</p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="icon">
                  <Volume2 className="w-5 h-5" />
                  <span className="sr-only">Listen</span>
                </Button>
                 <Button variant="outline" size="icon">
                  <Mic className="w-5 h-5" />
                   <span className="sr-only">Practice Pronunciation</span>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz.map((q, index) => (
            <div key={index}>
              <p className="font-semibold">{q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                {q.options.map(opt => (
                  <Button key={opt} variant="outline" className="justify-start">
                    {opt === q.answer && <Check className="w-4 h-4 mr-2 text-green-500"/>}
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mt-8">
        <Button variant="outline">
          <ChevronLeft className="w-4 h-4 mr-2"/>
          Previous Lesson
        </Button>
        <Button>
          Next Lesson
          <ChevronRight className="w-4 h-4 ml-2"/>
        </Button>
      </div>

    </div>
  );
}
