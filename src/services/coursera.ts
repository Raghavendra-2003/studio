/**
 * Represents a Coursera course.
 */
export interface CourseraCourse {
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
 * Asynchronously retrieves Coursera courses for a user.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of Coursera courses.
 */
export async function getCourseraCourses(userId: string): Promise<CourseraCourse[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '123',
      name: 'Machine Learning',
      progress: 50,
      url: 'https://www.coursera.org/learn/machine-learning',
    },
  ];
}
