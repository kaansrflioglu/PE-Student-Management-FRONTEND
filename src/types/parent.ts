import type { Sports } from "./sports";

export interface Parent {
  id: string;
  name: string;
  surname: string;
  phone?: string;
  height?: number;
  relation?: string;
  sportsBackground?: Sports[];
}