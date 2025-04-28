/**
 * Represents a Google Cloud Skills Boost course.
 */
export interface GoogleCloudSkillsBoostCourse {
  /**
   * The ID of the course.
   */
  id: string;
  /**
   * The name of the course.
   */
  name: string;
  /**
   * The progress of the course (0-100).
   */
  progress: number;
  /**
   * The URL of the course.
   */
  url: string;
}

/**
 * Asynchronously retrieves Google Cloud Skills Boost courses for a user.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of Google Cloud Skills Boost courses.
 */
export async function getGoogleCloudSkillsBoostCourses(userId: string): Promise<GoogleCloudSkillsBoostCourse[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '789',
      name: 'Cloud Architecture',
      progress: 25,
      url: 'https://www.cloudskillsboost.google/course/123',
    },
  ];
}
