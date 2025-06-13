
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

const dummySkillGaps = [
  { skill: "JavaScript (Advanced)", count: 45, fill: "hsl(var(--chart-1))" },
  { skill: "Python (Data Analysis)", count: 38, fill: "hsl(var(--chart-2))" },
  { skill: "Cloud (AWS/Azure)", count: 30, fill: "hsl(var(--chart-3))" },
  { skill: "UI Prototyping (Figma)", count: 25, fill: "hsl(var(--chart-4))" },
  { skill: "SQL Database Management", count: 22, fill: "hsl(var(--chart-5))" },
];

export default function SkillGapTracker() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" /> Most Common Skill Gaps
        </CardTitle>
        <CardDescription>
          Overview of skill gaps. (Demo: Shows sample data; a full version would analyze real student data from a database.)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dummySkillGaps.length > 0 ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dummySkillGaps}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="skill" type="category" width={150} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)' 
                  }}
                  labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                <Bar dataKey="count" name="Number of Students" barSize={20} radius={[0, 5, 5, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
           <p className="text-sm text-muted-foreground text-center py-4">No skill gap data available yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

