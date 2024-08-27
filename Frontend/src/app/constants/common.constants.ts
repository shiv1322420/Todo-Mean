export const API_BASE_URL = 'http://localhost:3000/api/notes';   //base url for backend api

export const NoteStatus = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const;                   // making it immutable object, it will add  readonly acceess to each property
  
  export type NoteStatusType = keyof typeof NoteStatus;     // create a type and make a union of status like "penindg" |"procession", etc.