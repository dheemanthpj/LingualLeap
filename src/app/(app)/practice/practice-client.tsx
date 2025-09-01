
"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  generatePersonalizedExercises,
  type GeneratePersonalizedExercisesOutput,
} from "@/ai/flows/generate-personalized-exercises";
import {
  provideSpeechRecognitionFeedback,
  type ProvideSpeechRecognitionFeedbackOutput,
} from "@/ai/flows/provide-speech-recognition-feedback";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Mic, Check, Ear, Square } from "lucide-react";

const topics = [
  { id: "greetings", label: "Greetings", level: "beginner" },
  { id: "travel", label: "Travel", level: "intermediate" },
  { id: "food", label: "Food", level: "intermediate" },
  { id: "work", label: "Work", level: "advanced" },
] as const;

const ExercisesFormSchema = z.object({
  topics: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one topic.",
  }),
});

type ExercisesFormValues = z.infer<typeof ExercisesFormSchema>;

const expectedPhrase = "Hola, ¿cómo estás?";

export function PracticeClient() {
  const [generatedExercises, setGeneratedExercises] = useState<GeneratePersonalizedExercisesOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<ProvideSpeechRecognitionFeedbackOutput | null>(null);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);

  const exercisesForm = useForm<ExercisesFormValues>({
    resolver: zodResolver(ExercisesFormSchema),
    defaultValues: { topics: ["greetings"] },
  });

  const onGenerateExercises: SubmitHandler<ExercisesFormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedExercises(null);
    const selectedTopics = topics.filter(topic => data.topics.includes(topic.id)).map(t => ({name: t.label, level: t.level as 'beginner' | 'intermediate' | 'advanced'}));
    const result = await generatePersonalizedExercises({
      learningLanguage: "Spanish",
      userLevel: "intermediate",
      exerciseTopics: selectedTopics
    });
    setGeneratedExercises(result);
    setIsGenerating(false);
  };
  
  const handleGetFeedback = async (spokenText: string) => {
    setIsGettingFeedback(true);
    setPronunciationFeedback(null);
    const result = await provideSpeechRecognitionFeedback({
      spokenText: spokenText,
      expectedText: expectedPhrase,
    });
    setPronunciationFeedback(result);
    setIsGettingFeedback(false);
  };
  
  const handleRecording = () => {
    setIsRecording(true);
    setPronunciationFeedback(null);
  }

  useEffect(() => {
    if (!isRecording) return;
    
    setRecordingProgress(0);
    const interval = setInterval(() => {
      setRecordingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRecording(false);
          // Simulate speech recognition result and get feedback
          // In a real app, this would come from a speech-to-text API.
          // We'll use a slightly incorrect phrase to demonstrate feedback.
          handleGetFeedback("Hola, como estas?");
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <Tabs defaultValue="pronunciation" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="exercises">Custom Exercises</TabsTrigger>
        <TabsTrigger value="pronunciation">Pronunciation</TabsTrigger>
      </TabsList>
      <TabsContent value="exercises">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Custom Exercise Generator</CardTitle>
            <CardDescription>Select topics to generate personalized exercises with AI.</CardDescription>
          </CardHeader>
          <Form {...exercisesForm}>
            <form onSubmit={exercisesForm.handleSubmit(onGenerateExercises)}>
              <CardContent>
                <FormField
                  control={exercisesForm.control}
                  name="topics"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Topics</FormLabel>
                        <FormDescription>
                          Select the topics you want to practice.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {topics.map((item) => (
                        <FormField
                          key={item.id}
                          control={exercisesForm.control}
                          name="topics"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate Exercises"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <div className="mt-6 space-y-4">
          {isGenerating && (
            <>
              <Skeleton className="w-full h-40" />
              <Skeleton className="w-full h-40" />
            </>
          )}
          {generatedExercises?.exercises.map((exercise, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-accent"/> {exercise.exerciseType}</CardTitle>
                <CardDescription>{exercise.instructions}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{exercise.content}</p>
              </CardContent>
              {exercise.answer && (
                <CardFooter className="flex flex-col items-start gap-2">
                  <p className="text-sm font-bold text-muted-foreground">Answer:</p>
                  <p className="text-green-600 font-medium">{exercise.answer}</p>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="pronunciation">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Pronunciation Practice</CardTitle>
            <CardDescription>Listen to the phrase and record yourself. Our AI will give you feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <Alert>
              <Ear className="h-4 w-4" />
              <AlertTitle>Phrase to practice:</AlertTitle>
              <AlertDescription className="text-xl font-bold text-foreground">
                {expectedPhrase}
              </AlertDescription>
            </Alert>
            <div className="flex flex-col items-center justify-center gap-4">
              {isRecording ? (
                <>
                  <Button size="icon" variant="destructive" className="size-20 rounded-full" onClick={() => setIsRecording(false)}>
                    <Square className="w-8 h-8"/>
                  </Button>
                  <p className="text-sm text-muted-foreground">Recording...</p>
                  <Progress value={recordingProgress} className="w-1/2" />
                </>
              ) : (
                <>
                  <Button size="icon" className="size-20 rounded-full" onClick={handleRecording} disabled={isGettingFeedback}>
                    <Mic className="w-8 h-8"/>
                  </Button>
                  <p className="text-sm text-muted-foreground">Click the button to start recording</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          {isGettingFeedback && <Skeleton className="w-full h-48" />}
          {pronunciationFeedback && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Your Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Accuracy Score</p>
                  <Progress value={pronunciationFeedback.accuracyScore * 100} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{Math.round(pronunciationFeedback.accuracyScore * 100)}% match</p>
                </div>
                <div>
                  <p className="font-semibold">Suggestions</p>
                  <Alert variant="default" className="mt-2 bg-background">
                    <Check className="h-4 w-4 text-primary" />
                    <AlertTitle>AI Tutor</AlertTitle>
                    <AlertDescription>{pronunciationFeedback.feedback}</AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
