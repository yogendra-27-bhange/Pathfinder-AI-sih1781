
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ScanSearch, Sparkles, GraduationCap, TrendingUp } from "lucide-react";
import Image from "next/image";
import { generateImage } from '@/ai/flows/generate-image-flow';

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "1. Create Your Profile",
    description: "Sign up and easily input your academic details, upload your resume, and select your areas of interest. The more information you provide, the better our AI can assist you.",
  },
  {
    icon: <ScanSearch className="h-8 w-8 text-primary" />,
    title: "2. AI-Powered Analysis",
    description: "Our advanced AI algorithms analyze your comprehensive profile against a vast database of career paths and skill requirements. We identify your strengths and potential areas for growth.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "3. Receive Personalized Recommendations",
    description: "Get a curated list of suggested career paths that align with your profile. Each suggestion includes key skills needed and an analysis of your current skill set.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "4. Identify Skill Gaps & Upskill",
    description: "Understand your skill gaps with our detailed report. We provide links to relevant courses from platforms like Coursera and YouTube to help you upskill effectively.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "5. Build Your Future",
    description: "With targeted guidance and resources, you're empowered to make informed decisions and proactively work towards your desired career.",
  },
];

const ORIGINAL_PLACEHOLDER_STUDENT_PLANNING = "https://placehold.co/500x500.png";

export default async function HowItWorksPage() {
  let studentPlanningImageUrl = ORIGINAL_PLACEHOLDER_STUDENT_PLANNING;
  try {
    const imageResult = await generateImage({ prompt: "Illustrative image of a student thoughtfully planning their career on a laptop, with abstract representations of pathways and future opportunities. Bright and optimistic." });
    if (imageResult.imageDataUri) {
      studentPlanningImageUrl = imageResult.imageDataUri;
    }
  } catch (error) {
    console.error("Failed to generate image for 'student planning career':", error);
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline mb-3">How PathFinder AI Works</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to unlock personalized career guidance and embark on your journey to success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image 
            src={studentPlanningImageUrl} 
            alt="Student using a laptop for career planning"
            fill={true}
            className="object-cover"
            data-ai-hint="student planning career"
          />
        </div>
        <div className="space-y-6">
          {steps.slice(0, 3).map((step, index) => (
            <Card key={index} className="bg-card shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {step.icon}
                <CardTitle className="text-xl font-semibold font-headline text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        {steps.slice(3).map((step, index) => (
            <Card key={index} className="bg-card shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {step.icon}
                <CardTitle className="text-xl font-semibold font-headline text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
      </div>

    </div>
  );
}
