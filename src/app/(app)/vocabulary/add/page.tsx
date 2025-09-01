"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVocabulary } from "@/hooks/use-vocabulary";
import { generateVocabularyImage } from "@/ai/flows/generate-vocabulary-image";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Loader2 } from "lucide-react";

const AddWordFormSchema = z.object({
  word: z.string().min(1, "Word is required."),
  translation: z.string().min(1, "Translation is required."),
  imageHint: z.string().optional(),
});

type AddWordFormValues = z.infer<typeof AddWordFormSchema>;

export default function AddVocabularyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { addWord } = useVocabulary();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddWordFormValues>({
    resolver: zodResolver(AddWordFormSchema),
    defaultValues: {
      word: "",
      translation: "",
      imageHint: "",
    },
  });

  const onSubmit: SubmitHandler<AddWordFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      let imageUrl = `https://picsum.photos/400/200?random=${Math.random()}`;
      const hint = data.imageHint || data.translation;
      
      try {
        const result = await generateVocabularyImage({ hint });
        if (result.imageUrl) {
          imageUrl = result.imageUrl;
        }
      } catch (error) {
         console.warn("AI image generation failed, using placeholder:", error);
      }

      addWord({
        word: data.word,
        translation: data.translation,
        image: imageUrl,
        dataAiHint: hint,
      });

      toast({
        title: "Word Added!",
        description: `"${data.word}" has been added to your vocabulary.`,
      });
      router.push("/vocabulary");
    } catch (error) {
      console.error("Failed to add word:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add the new word. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
       <div>
        <Button variant="ghost" asChild>
          <Link href="/vocabulary"><ChevronLeft className="w-4 h-4 mr-2" /> Back to Vocabulary</Link>
        </Button>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="font-headline">Add a New Word</CardTitle>
          <CardDescription>
            Expand your personal dictionary by adding a new word and its translation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Word</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Hola'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="translation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Translation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Hello'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Hint (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'waving hand'" {...field} />
                    </FormControl>
                     <FormDescription>
                      Provide a hint for the AI to generate a relevant image for your flashcard. If left blank, it will use the translation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Adding Word..." : "Add Word"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
