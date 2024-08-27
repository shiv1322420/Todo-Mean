import { Notes } from "./notes";

export interface ApiResponse {
    message: string;
    notes: Notes[];
  }