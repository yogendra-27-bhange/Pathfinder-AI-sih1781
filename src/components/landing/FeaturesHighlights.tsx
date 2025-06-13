
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="h-10 w-10 text-accent mb-4" />,
    title: "AI Profile Analysis",
    description: "Leverage AI to analyze your academic profile, interests, and resume for optimal career path identification.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-accent mb-4" />,
    title: "Personalized Career Results",
    description: "Receive tailored career suggestions presented in clear, easy-to-understand cards with skill requirements.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-accent mb-4" />,
    title: "Upskilling Guidance",
    description: "Get actionable recommendations and links to courses for bridging skill gaps and enhancing employability.",
  },
  {
    icon: <Users className="h-10 w-10 text-accent mb-4" />,
    title: "Student-Friendly Interface",
    description: "Navigate an intuitive and responsive platform designed to make career exploration engaging and simple.",
  },
];

export default function FeaturesHighlights() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">Why Choose PathFinder AI?</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover how our AI-powered tools can help you navigate your career path with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle className="text-xl font-semibold text-primary font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
