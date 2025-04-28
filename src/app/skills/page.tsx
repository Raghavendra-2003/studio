import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Mock data for skills - replace with actual data fetching
const skills = [
    { id: 's1', name: 'React Development', progress: 80, platform: 'Udemy' },
    { id: 's2', name: 'Machine Learning Fundamentals', progress: 55, platform: 'Coursera' },
    { id: 's3', name: 'Google Cloud Architecture', progress: 30, platform: 'Google Cloud Skills Boost' },
    { id: 's4', name: 'Python Programming', progress: 95, platform: 'Self-Study' },
];

export default function SkillsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">My Skills</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <Card key={skill.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <CardDescription>{skill.platform}</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="w-full bg-secondary rounded-full h-2.5 mb-2">
                   <div className="bg-accent h-2.5 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                 </div>
                 <p className="text-sm text-muted-foreground text-right">{skill.progress}% Completed</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">No skills added yet. Click "Add Skill" to start tracking.</p>
        )}
      </div>
    </div>
  );
}
