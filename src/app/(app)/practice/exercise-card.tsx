
"use client";

import { useState } from "react";
import type { GeneratePersonalizedExercisesOutput } from "@/ai/flows/generate-personalized-exercises";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Exercise = GeneratePersonalizedExercisesOutput["exercises"][0];

interface ExerciseCardProps {
  exercise: Exercise;
}

const BLANK_PLACEHOLDER = "____";

function FillInTheBlanksExercise({ exercise }: { exercise: Exercise }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!exercise.content?.includes(BLANK_PLACEHOLDER) || !exercise.answer) {
    return <p className="text-lg font-semibold">{exercise.content}</p>;
  }

  const parts = exercise.content.split(BLANK_PLACEHOLDER);
  const isCorrect = userAnswer.trim().toLowerCase() === exercise.answer.trim().toLowerCase();

  const handleCheck = () => {
    if (userAnswer.trim()) {
      setIsSubmitted(true);
    }
  };

  const handleRetry = () => {
    setUserAnswer("");
    setIsSubmitted(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
        <span>{parts[0]}</span>
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="your answer"
          className={cn(
            "w-40",
            isSubmitted && isCorrect && "border-green-500",
            isSubmitted && !isCorrect && "border-red-500"
          )}
          disabled={isSubmitted}
        />
        <span>{parts[1]}</span>
      </div>
      {!isSubmitted ? (
         <Button onClick={handleCheck}>Check Answer</Button>
      ) : (
         <Button onClick={handleRetry} variant="outline">Try Again</Button>
      )}

      {isSubmitted && (
        <div className="flex items-center gap-2 p-2 rounded-md" >
          {isCorrect ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              <p className="text-green-600 font-medium">Correct!</p>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <p className="text-red-600 font-medium">Not quite. The correct answer is: <span className="font-bold">{exercise.answer}</span></p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const isFillInTheBlanks = exercise.exerciseType.toLowerCase().includes("fill in the blanks");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" /> {exercise.exerciseType}
        </CardTitle>
        <CardDescription>{exercise.instructions}</CardDescription>
      </CardHeader>
      <CardContent>
        {isFillInTheBlanks ? (
          <FillInTheBlanksExercise exercise={exercise} />
        ) : (
          <p className="text-lg font-semibold">{exercise.content}</p>
        )}
      </CardContent>
      {!isFillInTheBlanks && exercise.answer && (
        <CardFooter className="flex flex-col items-start gap-2">
          <p className="text-sm font-bold text-muted-foreground">Answer:</p>
          <p className="text-green-600 font-medium">{exercise.answer}</p>
        </CardFooter>
      )}
    </Card>
  );
}
