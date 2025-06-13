
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmittedProfiles from "@/components/admin/SubmittedProfiles";
import ManageCategories from "@/components/admin/ManageCategories";
import SkillGapTracker from "@/components/admin/SkillGapTracker";
import { Users, ListChecks, BarChart3 } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">Admin Panel</h1>
        <p className="text-muted-foreground mt-1">Manage student data, career categories, and track platform insights.</p>
      </div>

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="profiles" className="py-3 text-sm">
            <Users className="mr-2 h-5 w-5" /> Submitted Profiles
          </TabsTrigger>
          <TabsTrigger value="categories" className="py-3 text-sm">
            <ListChecks className="mr-2 h-5 w-5" /> Manage Categories
          </TabsTrigger>
          <TabsTrigger value="skillgaps" className="py-3 text-sm">
            <BarChart3 className="mr-2 h-5 w-5" /> Skill Gap Tracker
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profiles">
          <SubmittedProfiles />
        </TabsContent>
        <TabsContent value="categories">
          <ManageCategories />
        </TabsContent>
        <TabsContent value="skillgaps">
          <SkillGapTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}
