import { EventLocation } from "./EventLocation";

export interface Course {
  id: number;  
  name: string;
  instructor: string;
  eventLocationId: number;
  eventLocation: EventLocation;
  dates: {
    begin: string;
    end: string;
  }[];
}
