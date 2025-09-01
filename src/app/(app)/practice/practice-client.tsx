
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSettings } from "@/hooks/use-settings";

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
import { Lightbulb, Mic, Check, Square, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { ExerciseCard } from "./exercise-card";


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

export function PracticeClient({ allPhrases }: { allPhrases: string[] }) {
  const { learningLanguage } = useSettings();
  const { toast } = useToast();
  const [generatedExercises, setGeneratedExercises] = useState<GeneratePersonalizedExercisesOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Pronunciation state
  const [pronunciationFeedback, setPronunciationFeedback] = useState<ProvideSpeechRecognitionFeedbackOutput | null>(null);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [expectedPhrase, setExpectedPhrase] = useState(allPhrases[0] || "Select a phrase");
  const [spokenText, setSpokenText] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);


  const exercisesForm = useForm<ExercisesFormValues>({
    resolver: zodResolver(ExercisesFormSchema),
    defaultValues: { topics: ["greetings"] },
  });

  // Setup Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = learningLanguage.code;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSpokenText(transcript);
          handleGetFeedback(transcript, expectedPhrase);
        };
        
        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          toast({ variant: "destructive", title: "Recognition Error", description: "Could not recognize speech. Please try again."})
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } else {
        toast({ variant: "destructive", title: "Unsupported Browser", description: "Your browser does not support speech recognition."})
      }
    }
  }, [learningLanguage.code, expectedPhrase, toast]);


  const onGenerateExercises: SubmitHandler<ExercisesFormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedExercises(null);
    const selectedTopics = topics.filter(topic => data.topics.includes(topic.id)).map(t => ({name: t.label, level: t.level as 'beginner' | 'intermediate' | 'advanced'}));
    const result = await generatePersonalizedExercises({
      learningLanguage: learningLanguage.name,
      userLevel: "intermediate",
      exerciseTopics: selectedTopics
    });
    setGeneratedExercises(result);
    setIsGenerating(false);
  };
  
  const handleGetFeedback = async (spokenText: string, expected: string) => {
    setIsGettingFeedback(true);
    setPronunciationFeedback(null);
    try {
      const result = await provideSpeechRecognitionFeedback({
        spokenText: spokenText,
        expectedText: expected,
      });
      setPronunciationFeedback(result);
    } catch (error) {
       console.error("Feedback generation failed:", error);
       toast({ variant: "destructive", title: "AI Error", description: "Could not get feedback from the AI tutor."})
    } finally {
      setIsGettingFeedback(false);
    }
  };
  
  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setPronunciationFeedback(null);
      setSpokenText(null);
      setIsRecording(true);
      recognitionRef.current?.start();
    }
  };


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
            <CardDescription>Select topics to generate personalized exercises with AI for {learningLanguage.name}.</CardDescription>
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
            <div className="space-y-4">
              <Skeleton className="w-full h-40" />
              <Skeleton className="w-full h-40" />
            </div>
          )}
          {generatedExercises?.exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="pronunciation">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Pronunciation Practice</CardTitle>
            <CardDescription>Select a phrase, then record yourself. Our AI will give you feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
                <Label>Phrase to practice</Label>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={popoverOpen}
                      className="w-full justify-between"
                      disabled={allPhrases.length === 0}
                    >
                      <span className="truncate">{expectedPhrase}</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Search phrase..." />
                      <CommandList>
                        <CommandEmpty>No phrase found.</CommandEmpty>
                        <CommandGroup>
                          {allPhrases.map((phrase) => (
                            <CommandItem
                              key={phrase}
                              value={phrase}
                              onSelect={(currentValue) => {
                                setExpectedPhrase(currentValue === expectedPhrase ? "" : currentValue)
                                setPopoverOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  expectedPhrase === phrase ? "opacity-100" : "opacity-0"
                                )}
                              />
                               <span className="truncate">{phrase}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
             </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Button size="icon" className="size-20 rounded-full" onClick={handleToggleRecording} disabled={isGettingFeedback || allPhrases.length === 0}>
                {isRecording ? <Square className="w-8 h-8 fill-current"/> : <Mic className="w-8 h-8"/>}
              </Button>
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Recording...' : 'Click the button to start recording'}
              </p>
              {spokenText && (
                <p className="text-sm">You said: <span className="font-medium text-foreground">{spokenText}</span></p>
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
