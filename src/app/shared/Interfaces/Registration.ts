import { Course } from "./Course";

export interface Registration {
  id: number;
  name: string;
  birthdate: string;
  courseId: number;
  course?: any; 
  registrationDate?: string; 
  isDeleting?: boolean;      
}
