
import { BrainCircuit, Users, Target } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateImage } from '@/ai/flows/generate-image-flow';

const ORIGINAL_PLACEHOLDER_TEAM = "https://placehold.co/600x400.png";

export default async function AboutPage() {
  let teamCollaborationImageUrl = ORIGINAL_PLACEHOLDER_TEAM;
  try {
    const imageResult = await generateImage({ prompt: "Photo of a diverse team collaborating enthusiastically on a project in a modern, bright office setting, conveying innovation and teamwork." });
    if (imageResult.imageDataUri) {
      teamCollaborationImageUrl = imageResult.imageDataUri;
    }
  } catch (error) {
    console.error("Failed to generate image for 'team collaboration':", error);
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-4">About PathFinder AI</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering students to discover their ideal career paths and build the skills for a successful future through intelligent, AI-driven guidance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-primary font-headline mb-6">Our Mission</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            At PathFinder AI, our mission is to bridge the gap between education and employment by providing students with personalized, data-driven career counseling. We believe that every student deserves to find a fulfilling career that aligns with their unique talents, interests, and academic achievements.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Traditional career guidance can often be generic or inaccessible. We leverage the power of artificial intelligence to offer scalable, precise, and actionable insights, helping students make informed decisions about their future and identify the specific skills needed to thrive in tomorrow&apos;s job market.
          </p>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={teamCollaborationImageUrl}
            alt="Team working on AI solutions"
            fill={true}
            className="object-cover"
            data-ai-hint="team collaboration"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-primary font-headline text-center mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center">
              <BrainCircuit className="h-12 w-12 text-accent mb-3" />
              <CardTitle className="font-headline text-xl text-primary">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sophisticated algorithms analyze resumes, academic performance, and interests to provide tailored career suggestions.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center">
              <Target className="h-12 w-12 text-accent mb-3" />
              <CardTitle className="font-headline text-xl text-primary">Personalized Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Customized career path recommendations and skill gap reports to guide your development journey.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center">
              <Users className="h-12 w-12 text-accent mb-3" />
              <CardTitle className="font-headline text-xl text-primary">Student-Centric Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                An intuitive, responsive, and engaging platform designed to make career exploration easy and effective.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-semibold text-primary font-headline mb-6">Join Us on Your Path to Success</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          PathFinder AI is more than just a tool; it&apos;s your partner in navigating the complexities of career planning. Let&apos;s build your future, together.
        </p>
      </div>
    </div>
  );
}
