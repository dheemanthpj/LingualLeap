"use client"

import * as React from "react"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const vocabulary = [
  { word: "Hola", translation: "Hello", image: "https://picsum.photos/400/200?random=1", dataAiHint: "greeting wave" },
  { word: "Gracias", translation: "Thank you", image: "https://picsum.photos/400/200?random=2", dataAiHint: "gratitude hands" },
  { word: "Adiós", translation: "Goodbye", image: "https://picsum.photos/400/200?random=3", dataAiHint: "waving goodbye" },
  { word: "Por favor", translation: "Please", image: "https://picsum.photos/400/200?random=4", dataAiHint: "polite gesture" },
  { word: "Sí", translation: "Yes", image: "https://picsum.photos/400/200?random=5", dataAiHint: "thumbs up" },
  { word: "No", translation: "No", image: "https://picsum.photos/400/200?random=6", dataAiHint: "shaking head" },
]

function Flashcard({ word, translation, image, dataAiHint }: typeof vocabulary[0]) {
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
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
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
      <div className="text-center">
        <p className="text-muted-foreground">Click card to flip. Use arrows to navigate.</p>
      </div>
    </div>
  )
}
