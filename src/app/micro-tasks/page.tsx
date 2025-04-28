'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw, BrainCircuit } from "lucide-react";
import { generateMicroTask } from '@/ai/flows/generate-micro-task';
import { Skeleton } from '@/components/ui/skeleton';

// TODO: Replace with actual user ID from authentication
const MOCK_USER_ID = "user123";

interface HistoricalTask {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

// Initial mock data - remove if fetching from backend
const initialHistoricalTasks: HistoricalTask[] = [
  // { id: 't1', text: 'Review the useState hook in React.', completed: true, date: '2024-07-25' },
  // { id: 't2', text: 'Read one article about serverless architecture.', completed: true, date: '2024-07-24' },
  // { id: 't3', text: 'Watch a 5-minute video on Python list comprehensions.', completed: false, date: '2024-07-23' },
];

export default function MicroTasksPage() {
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // State for current task completion
  const [historicalTasks, setHistoricalTasks] = useState<HistoricalTask[]>(initialHistoricalTasks); // Manage historical tasks in state

  const fetchNewTask = useCallback(async () => {
    setIsGenerating(true);
    setCurrentTask(null);
    setIsCompleted(false); // Reset completion status for new task
    try {
      const result = await generateMicroTask({ userId: MOCK_USER_ID });
      setCurrentTask(result.task);
    } catch (error) {
      console.error("Error generating micro-task:", error);
      setCurrentTask("Could not generate a task. Please try refreshing.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Fetch initial task on mount
  useEffect(() => {
    // Only fetch if there's no current task (e.g., on initial load)
    if (!currentTask) {
        fetchNewTask();
    }
  }, [fetchNewTask, currentTask]); // Depend on currentTask as well

  const handleCompleteTask = () => {
      if (!currentTask || isCompleted) return; // Do nothing if no task or already completed

      // TODO: Implement logic to save task completion status (e.g., API call to Firestore)
      console.log("Task marked as complete:", currentTask);
      setIsCompleted(true);

      // Add the completed task to the beginning of the historical tasks list
      const newHistoricalTask: HistoricalTask = {
          id: `task-${Date.now()}`, // Generate a unique ID
          text: currentTask,
          completed: true,
          date: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
      };

      setHistoricalTasks(prevTasks => [newHistoricalTask, ...prevTasks]);

      // Clear the current task state after marking as done and adding to history
      // You might want to automatically fetch a new task here instead
      // setCurrentTask(null); // Clears the current task display
      // fetchNewTask(); // Fetches a new task immediately
  };


  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Micro-Learning Tasks</h1>

      <Card className="shadow-lg border-accent border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BrainCircuit className="h-6 w-6 text-accent"/> Today's Task
          </CardTitle>
          <CardDescription>Focus on one small step today!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {isGenerating && (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            )}
            {!isGenerating && currentTask && !isCompleted && ( // Show task only if not completed
                <p className="text-lg text-foreground">{currentTask}</p>
            )}
             {!isGenerating && isCompleted && currentTask && ( // Show completed message for the *current* task
                 <p className="text-lg text-accent">Task completed! Generate a new one or check your history.</p>
            )}
            {!isGenerating && !currentTask && ( // Initial state or after clearing task
                 <p className="text-lg text-muted-foreground">Click 'New Task' to get started.</p>
            )}

          <div className="flex space-x-2">
             <Button
                variant="default"
                onClick={handleCompleteTask}
                disabled={isGenerating || !currentTask || isCompleted} // Disable if no task or already completed
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isCompleted ? 'Completed!' : 'Mark as Done'}
            </Button>
            <Button
                variant="outline"
                onClick={fetchNewTask} // Fetch a new task explicitly
                disabled={isGenerating}
              >
              <RotateCcw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating...' : 'New Task'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Task History</h2>
        <div className="space-y-3">
          {historicalTasks.length > 0 ? (
            historicalTasks.map((task) => (
              <Card key={task.id} className={`shadow-sm ${task.completed ? 'bg-secondary' : ''}`}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{task.text}</p>
                    <p className="text-xs text-muted-foreground">{new Date(task.date).toLocaleDateString()}</p>
                  </div>
                  {/* Use text-accent for completed icon color */}
                  {task.completed && <CheckCircle className="h-5 w-5 text-accent" />}
                </CardContent>
              </Card>
            ))
          ) : (
             <Card className="shadow-sm">
                <CardContent className="p-4 text-center text-muted-foreground">
                    No past tasks recorded yet. Complete your first task!
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
