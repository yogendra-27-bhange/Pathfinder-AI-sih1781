
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Shield } from 'lucide-react';
import { generateImage } from '@/ai/flows/generate-image-flow';

const ORIGINAL_PLACEHOLDER_HERO = "https://placehold.co/600x400.png";

export default async function HeroSection() {
  let heroImageUrl = ORIGINAL_PLACEHOLDER_HERO;
  try {
    const imageResult = await generateImage({ prompt: "Inspirational, abstract illustration depicting AI assisting diverse students with career guidance. Show subtle technological elements, bright future motifs. Modern and clean." });
    if (imageResult.imageDataUri) {
      heroImageUrl = imageResult.imageDataUri;
    }
  } catch (error) {
    console.error("Failed to generate image for 'career guidance students':", error);
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary font-headline tracking-tight">
            AI Career Guide
          </h1>
          <p className="text-2xl sm:text-3xl font-medium text-foreground/90 font-headline">
            Find Your Path. Build Your Future.
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
            PathFinder AI is a smart platform that guides students toward the most suitable career paths using AI-driven skill analysis and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
              <Link href="/login/student">
                <User className="mr-2 h-5 w-5" /> Student Login
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 shadow-lg transition-transform hover:scale-105">
              <Link href="/login/admin">
                <Shield className="mr-2 h-5 w-5" /> Admin Login
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-foreground/80 hover:text-primary hover:bg-transparent transition-transform hover:scale-105">
              <Link href="/how-it-works">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={heroImageUrl}
            alt="AI Career Guidance illustration"
            fill={true}
            data-ai-hint="career guidance students"
            className="object-cover transform transition-transform duration-500 hover:scale-105"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
