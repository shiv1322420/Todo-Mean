import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/common.constants';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Notes } from '../interfaces/notes';
import { ToastService } from '../services/toast.service';
import { ApiResponse } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private  apiUrl  = API_BASE_URL;

  constructor(private http: HttpClient,  private toastService: ToastService) { }
  
  getNotes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}`).pipe(
      tap((res:any) =>{
        let message = res?.message || 'Data fetched Successfully';
        this.toastService.showSuccess(message)
      }),
      catchError((error) => {
        const errorMessage =error.error.error || error?.message || 'An unexpected error occurred.';
        this.toastService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getNotesByFiler(filters: { title?: string, status?: string }): Observable<ApiResponse> {
    let params = new HttpParams();
    if (filters.title) {
      params = params.set('title', filters.title);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    console.log()
    return this.http.get<ApiResponse>(`${this.apiUrl}/search`,{ params }).pipe(
      tap((res:any) =>{
        let message = res?.message || 'Data fetched Successfully';
        this.toastService.showSuccess(message)
      }),
      catchError((error) => {
        const errorMessage =error.error.error || error?.message || 'An unexpected error occurred.';
        this.toastService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getNoteById(id: number): Observable<Notes> {
    return this.http.get<Notes>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.toastService.showSuccess('Note fetched successfully!')),
      catchError((error) => {
        this.toastService.showError('Failed to fetch note.');
        return throwError(() => error);
      })
    );
  }

  createNote(note: Notes): Observable<Notes> {
    return this.http.post<Notes>(this.apiUrl, note).pipe(
      tap(() => this.toastService.showSuccess('Note created successfully!')),
      catchError((error) => {
        this.toastService.showError('Failed to create note.');
        return throwError(() => error);
      })
    );
  }

  updateNote(id: number, note: Notes): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/${id}`, note).pipe(
      tap(() => this.toastService.showSuccess('Note updated successfully!')),
      catchError((error) => {
        this.toastService.showError('Failed to update note.');
        return throwError(() => error);
      })
    );
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.toastService.showSuccess('Note deleted successfully!')),
      catchError((error) => {
        this.toastService.showError('Failed to delete note.');
        return throwError(() => error);
      })
    );
  }
}
