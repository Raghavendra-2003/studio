'use server';

/**
 * @fileOverview A flow to generate personalized micro-learning tasks for users.
 *
 * - generateMicroTask - A function that generates a micro-learning task.
 * - GenerateMicroTaskInput - The input type for the generateMicroTask function.
 * - GenerateMicroTaskOutput - The return type for the generateMicroTask function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getCourseraCourses, CourseraCourse} from '@/services/coursera';
import {getUdemyCourses, UdemyCourse} from '@/services/udemy';
import {getGoogleCloudSkillsBoostCourses, GoogleCloudSkillsBoostCourse} from '@/services/google-cloud-skills-boost';

const GenerateMicroTaskInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
});
export type GenerateMicroTaskInput = z.infer<typeof GenerateMicroTaskInputSchema>;

const GenerateMicroTaskOutputSchema = z.object({
  task: z.string().describe('A personalized micro-learning task for the user.'),
});
export type GenerateMicroTaskOutput = z.infer<typeof GenerateMicroTaskOutputSchema>;

export async function generateMicroTask(input: GenerateMicroTaskInput): Promise<GenerateMicroTaskOutput> {
  return generateMicroTaskFlow(input);
}

const learningPlatforms = [
  {
    name: 'Coursera',
    service: getCourseraCourses,
  },
  {
    name: 'Udemy',
    service: getUdemyCourses,
  },
  {
    name: 'Google Cloud Skills Boost',
    service: getGoogleCloudSkillsBoostCourses,
  },
];

const getUserCourses = ai.defineTool({
  name: 'getUserCourses',
  description: 'Retrieves courses from various learning platforms for a given user.',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user.'),
  }),
  outputSchema: z.array(z.object({
    platform: z.string(),
    courses: z.array(z.object({
      id: z.string(),
      name: z.string(),
      progress: z.number(),
      url: z.string(),
    })),
  })),
}, async (input) => {
  const userCourses = [];
  for (const platform of learningPlatforms) {
    const courses = await platform.service(input.userId);
    userCourses.push({
      platform: platform.name,
      courses,
    });
  }
  return userCourses;
});

const prompt = ai.definePrompt({
  name: 'generateMicroTaskPrompt',
  tools: [getUserCourses],
  input: {
    schema: z.object({
      userId: z.string().describe('The ID of the user.'),
    }),
  },
  output: {
    schema: z.object({
      task: z.string().describe('A personalized micro-learning task for the user.'),
    }),
  },
  prompt: `You are an AI micro-learning task generator. You will generate a single micro-learning task for the user based on their current courses and learning goals.

  The micro-learning task should be achievable within 5-10 minutes.

  Use the getUserCourses tool to get the user's current courses and learning goals.

  Here is the user's ID: {{{userId}}}

  If the user has courses in progress, generate a task related to one of those courses. Suggest to dedicate 5-10 minutes to that course.
  If the user has no courses in progress, suggest a general learning task related to their interests.
`,
});

const generateMicroTaskFlow = ai.defineFlow<
  typeof GenerateMicroTaskInputSchema,
  typeof GenerateMicroTaskOutputSchema
>({
  name: 'generateMicroTaskFlow',
  inputSchema: GenerateMicroTaskInputSchema,
  outputSchema: GenerateMicroTaskOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
