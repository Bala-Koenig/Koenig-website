import { readFileSync } from 'fs';
import { join } from 'path';

export type CachedCourseData = {
  lastSync: string;
  courseId: number;
  basic: Record<string, any> | null;
  onlineSchedule: Record<string, any>[];
  classroomSchedule: Record<string, any>[];
  pricing: Record<string, any> | null;
  feedback: Record<string, any>[];
  content: Record<string, any> | null;
  beforeAfterCourses: Record<string, any>[];
};

export function getCachedCourseData(): CachedCourseData | null {
  try {
    const dataPath = join(process.cwd(), 'data', 'az-104.json');
    const raw = readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read course cache:', error);
    return null;
  }
}
