import { NoteStatusType } from "../constants/common.constants";


export interface Notes {
    id?: number;
    title: string;
    description: string;
    status?: NoteStatusType;
    createdAt?: string;
    updatedAt?: string;
}
