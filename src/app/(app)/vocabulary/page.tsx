"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useVocabulary } from "@/hooks/use-vocabulary"
import { PlusCircle } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function Flashcard({ word, translation, image, dataAiHint }: {word: string, translation: string, image: string, dataAiHint: string}) {
  const [isFlipped, setIsFlipped] = React.useState(false)

  React.useEffect(() => {
    setIsFlipped(false)
  }, [word])

  return (
    <div className="perspective-1000 w-full h-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className="relative w-full h-full text-center transition-transform duration-700 transform-style-3d"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="h-full flex flex-col items-center justify-center shadow-lg">
            <CardContent className="p-6">
              <p className="text-4xl font-bold font-headline">{word}</p>
            </CardContent>
          </Card>
        </div>
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <Card className="h-full flex flex-col items-center justify-center shadow-lg">
            <CardContent className="p-6 w-full">
              <p className="text-3xl font-bold font-headline">{translation}</p>
              <Image 
                src={image} 
                alt={translation} 
                width={400} 
                height={200}
                className="mt-4 rounded-lg object-cover aspect-video w-full"
                data-ai-hint={dataAiHint}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function VocabularyPage() {
  const { vocabulary } = useVocabulary();

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline">My Vocabulary</h1>
        <Button asChild>
          <Link href="/vocabulary/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Word
          </Link>
        </Button>
      </div>

      {vocabulary.length > 0 ? (
        <Carousel className="w-full">
          <CarouselContent>
            {vocabulary.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-[25rem]">
                  <Flashcard {...item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Card className="w-full h-[25rem] flex flex-col justify-center items-center text-center bg-muted/50 border-dashed">
            <CardContent className="p-6">
                <h3 className="text-xl font-semibold">Your vocabulary list is empty.</h3>
                <p className="text-muted-foreground mt-2">
                    Click &quot;Add New Word&quot; to start building your personal flashcard deck.
                </p>
            </CardContent>
        </Card>
      )}

      <div className="text-center">
        <p className="text-muted-foreground">Click card to flip. Use arrows to navigate.</p>
      </div>
    </div>
  )
}
