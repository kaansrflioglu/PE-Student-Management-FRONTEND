import type { Sports } from "./sports";
import type { Parent } from "./parent";

export interface Student {
  id?: string;
  name: string;
  surname: string;
  weight?: number;
  height?: number;
  pace?: number;
  flexibility?: string;
  leap?: number;
  armStrength?: number;
  legStrength?: number;
  muscleAnatomy?: string;
  gradeLevel?: number;
  gradeSection?: string;
  picture?: string;
  preferredSports?: Sports[];
  suitableSports?: Sports[];
  parents?: Parent[];
}