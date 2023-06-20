import { Timestamp } from "@/types/timestamp";

export interface Movie {
  uuid: string;
  name: string;
  description: string;
  isExplicit: boolean;
  thumbnail: string;
  timestamps: Timestamp[];
}
