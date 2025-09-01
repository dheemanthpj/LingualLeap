
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, Mic, Volume2, X } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { speak } from "@/ai/flows/speak";
import { allLessons } from "@/lib/lessons-data";
import { useParams } from "next/navigation";
import { useSettings } from "@/hooks/use-settings";
import { useLessonProgress } from "@/hooks/use-lesson-progress";


function QuizItem({ question, options, answer, onCorrect }: (typeof allLessons[0]['quiz'][0] & { onCorrect: () => void })) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    const correct = option === answer;
    setIsCorrect(correct);
    if (correct) {
        onCorrect();
    }
  };

  const getButtonVariant = (option: string) => {
    if (selected === null) return "outline";
    if (option === selected) {
      return isCorrect ? "success" : "destructive";
    }
    if (option === answer) return "success";
    return "outline";
  }

  const getButtonIcon = (option: string) => {
    if (selected === null) return null;
    if (option === selected) {
      return isCorrect ? <Check className="w-4 h-4 mr-2"/> : <X className="w-4 h-4 mr-2"/>;
    }
    if (option === answer) return <Check className="w-4 h-4 mr-2"/>;
    return null;
  }

  return (
    <div>
      <p className="font-semibold">{question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
        {options.map(opt => (
          <Button 
            key={opt} 
            variant={getButtonVariant(opt)}
            className="justify-start"
            onClick={() => handleOptionClick(opt)}
            disabled={selected !== null}
          >
            {getButtonIcon(opt)}
            {opt}
          </Button>
        ))}
      </div>
      {selected !== null && !isCorrect && (
         <p className="text-sm text-muted-foreground mt-2">Correct answer: <span className="font-semibold text-green-600">{answer}</span></p>
      )}
    </div>
  )
}

export default function LessonPage() {
  const params = useParams() as { lessonSlug: string };
  const { toast } = useToast();
  const { learningLanguage } = useSettings();
  const { completeLesson } = useLessonProgress();
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const lessonDetails = allLessons.find(l => l.slug === params.lessonSlug);

  useEffect(() => {
    if (lessonDetails && correctAnswers === lessonDetails.quiz.length) {
        completeLesson(params.lessonSlug);
        toast({
            title: "Lesson Complete!",
            description: `You've mastered "${lessonDetails.title}".`,
        });
    }
  }, [correctAnswers, lessonDetails, params.lessonSlug, completeLesson, toast]);
  
  const handleCorrectAnswer = () => {
    setCorrectAnswers(prev => prev + 1);
  };
  
  const handleSpeak = async (text: string) => {
    if (isSpeaking === text) return;
    setIsSpeaking(text);
    try {
      const { media } = await speak({ text, languageCode: learningLanguage.code });
      const audio = new Audio(media);
      audio.play();
      audio.onended = () => setIsSpeaking(null);
    } catch (error) {
      console.error("Text-to-speech failed:", error);
      toast({
        variant: "destructive",
        title: "Speech Error",
        description: "Could not play audio. Please try again.",
      });
      setIsSpeaking(null);
    }
  };
  
  const currentLessonIndex = allLessons.findIndex(l => l.slug === params.lessonSlug);
  
  const previousLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;


  if (!lessonDetails) {
    return <div className="text-center">Lesson not found.</div>;
  }
  
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
      
      {phrases && phrases.length > 0 && (
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
                  <Button variant="outline" size="icon" onClick={() => handleSpeak(item.phrase)} disabled={isSpeaking !== null}>
                    <Volume2 className={`w-5 h-5 ${isSpeaking === item.phrase ? 'animate-pulse' : ''}`} />
                    <span className="sr-only">Listen</span>
                  </Button>
                   <Button variant="outline" size="icon" asChild>
                     <Link href="/practice">
                        <Mic className="w-5 h-5" />
                        <span className="sr-only">Practice Pronunciation</span>
                     </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}


      {quiz && quiz.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quiz.map((q, index) => (
              <QuizItem key={index} {...q} onCorrect={handleCorrectAnswer} />
            ))}
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-between items-center mt-8">
        <Button variant="outline" asChild disabled={!previousLesson}>
          <Link href={previousLesson ? `/learn/${previousLesson.slug}`: '#'}>
            <ChevronLeft className="w-4 h-4 mr-2"/>
            Previous Lesson
          </Link>
        </Button>
        <Button asChild disabled={!nextLesson}>
          <Link href={nextLesson ? `/learn/${nextLesson.slug}`: '#'}>
            Next Lesson
            <ChevronRight className="w-4 h-4 ml-2"/>
          </Link>
        </Button>
      </div>

    </div>
  );
}
