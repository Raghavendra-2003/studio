/**
 * Represents a Udemy course.
 */
export interface UdemyCourse {
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
 * Asynchronously retrieves Udemy courses for a user.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of Udemy courses.
 */
export async function getUdemyCourses(userId: string): Promise<UdemyCourse[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '456',
      name: 'Web Development',
      progress: 75,
      url: 'https://www.udemy.com/course/web-development',
    },
  ];
}
