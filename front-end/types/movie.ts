import { Timestamp } from "@/types/timestamp";

export interface Movie {
  uuid: string;
  title: string;
  description: string;
  isExplicit: boolean;
  thumbnail: string;
  timestamps: Timestamp[];
}
