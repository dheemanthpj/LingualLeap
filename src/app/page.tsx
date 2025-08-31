import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BookOpenText, MessageSquareQuote } from "lucide-react";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Link href="/" className="flex items-center justify-center">
          <Logo className="h-6 w-auto" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Unlock Your World with <span className="text-primary">LinguaLeap</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience a revolutionary way to learn languages. Our AI-powered tutors create personalized lessons just for you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Start Learning for Free</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/600/400"
                alt="Hero"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="language learning"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Learn Smarter, Not Harder</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to accelerate your learning and keep you motivated.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Personalized AI Tutor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our AI adapts to your learning pace, creating exercises and lessons that are just right for you.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                    <MessageSquareQuote className="w-8 h-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Speech Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get real-time feedback on your pronunciation to sound more like a native speaker.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                    <BookOpenText className="w-8 h-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Interactive Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Engage with dynamic lessons, from vocabulary flashcards to real-world conversation practice.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 LinguaLeap. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
