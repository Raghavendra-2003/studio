'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit, ExternalLink, RotateCcw } from "lucide-react";
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCourseraCourses, CourseraCourse } from '@/services/coursera';
import { getUdemyCourses, UdemyCourse } from '@/services/udemy';
import { getGoogleCloudSkillsBoostCourses, GoogleCloudSkillsBoostCourse } from '@/services/google-cloud-skills-boost';
import { generateMicroTask } from '@/ai/flows/generate-micro-task';
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";


// TODO: Replace with actual user ID from authentication
const MOCK_USER_ID = "user123";

type CombinedCourse = (CourseraCourse | UdemyCourse | GoogleCloudSkillsBoostCourse) & { platform: string };

export function Dashboard() {
    const [microTask, setMicroTask] = React.useState<string | null>(null);
    const [isGeneratingTask, setIsGeneratingTask] = React.useState(false);

    const { data: courseraCourses, isLoading: isLoadingCoursera, error: errorCoursera } = useQuery<CourseraCourse[]>({
        queryKey: ['courseraCourses', MOCK_USER_ID],
        queryFn: () => getCourseraCourses(MOCK_USER_ID),
    });

    const { data: udemyCourses, isLoading: isLoadingUdemy, error: errorUdemy } = useQuery<UdemyCourse[]>({
        queryKey: ['udemyCourses', MOCK_USER_ID],
        queryFn: () => getUdemyCourses(MOCK_USER_ID),
    });

    const { data: googleCourses, isLoading: isLoadingGoogle, error: errorGoogle } = useQuery<GoogleCloudSkillsBoostCourse[]>({
        queryKey: ['googleCourses', MOCK_USER_ID],
        queryFn: () => getGoogleCloudSkillsBoostCourses(MOCK_USER_ID),
    });

    const combinedCourses: CombinedCourse[] = React.useMemo(() => {
        const courses: CombinedCourse[] = [];
        if (courseraCourses) courses.push(...courseraCourses.map(c => ({ ...c, platform: 'Coursera' })));
        if (udemyCourses) courses.push(...udemyCourses.map(c => ({ ...c, platform: 'Udemy' })));
        if (googleCourses) courses.push(...googleCourses.map(c => ({ ...c, platform: 'Google Cloud Skills Boost' })));
        return courses;
    }, [courseraCourses, udemyCourses, googleCourses]);

    const isLoading = isLoadingCoursera || isLoadingUdemy || isLoadingGoogle;
    const hasError = errorCoursera || errorUdemy || errorGoogle;

    const fetchMicroTask = React.useCallback(async () => {
        setIsGeneratingTask(true);
        setMicroTask(null); // Clear previous task
        try {
            const result = await generateMicroTask({ userId: MOCK_USER_ID });
            setMicroTask(result.task);
        } catch (error) {
            console.error("Error generating micro-task:", error);
            setMicroTask("Could not generate a task at this time. Please try again later.");
        } finally {
            setIsGeneratingTask(false);
        }
    }, []);

    // Fetch initial micro-task on component mount
    React.useEffect(() => {
        fetchMicroTask();
    }, [fetchMicroTask]);


    const renderCourseCard = (course: CombinedCourse) => (
        <Card key={`${course.platform}-${course.id}`} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>{course.platform}</CardDescription>
                    </div>
                     <Link href={course.url} target="_blank" rel="noopener noreferrer" passHref>
                         <Button variant="ghost" size="icon" aria-label={`Go to ${course.name} on ${course.platform}`}>
                             <ExternalLink className="h-4 w-4" />
                         </Button>
                     </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 mb-1">
                    <Progress value={course.progress} className="w-full h-2 bg-secondary" />
                    <span className="text-sm font-medium text-muted-foreground">{course.progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Progress</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="container mx-auto p-4 md:p-6 space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

            <Card className="shadow-lg bg-gradient-to-r from-primary to-blue-800 text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                         <BrainCircuit className="h-6 w-6"/> Today's Micro-Task
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {isGeneratingTask && (
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4 bg-primary-foreground/20" />
                            <Skeleton className="h-4 w-1/2 bg-primary-foreground/20" />
                         </div>
                    )}
                    {!isGeneratingTask && microTask && <p className="text-lg">{microTask}</p>}
                     {!isGeneratingTask && !microTask && <p className="text-lg text-muted-foreground">Click refresh to generate a new task.</p>}
                   <Button
                        variant="secondary"
                        size="sm"
                        onClick={fetchMicroTask}
                        disabled={isGeneratingTask}
                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    >
                        <RotateCcw className={`h-4 w-4 mr-2 ${isGeneratingTask ? 'animate-spin' : ''}`} />
                        {isGeneratingTask ? 'Generating...' : 'Refresh Task'}
                    </Button>
                </CardContent>
            </Card>

            <Separator />

            <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">My Courses</h2>
                {isLoading && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Skeleton className="h-36 rounded-lg" />
                        <Skeleton className="h-36 rounded-lg" />
                        <Skeleton className="h-36 rounded-lg" />
                     </div>
                )}
                {hasError && <p className="text-destructive">Error loading courses. Please try again later.</p>}
                {!isLoading && !hasError && combinedCourses.length === 0 && (
                    <p className="text-muted-foreground">No courses tracked yet. Connect your learning accounts in Settings.</p>
                )}
                {!isLoading && !hasError && combinedCourses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {combinedCourses.map(renderCourseCard)}
                    </div>
                )}
            </div>

        </div>
    );
}
