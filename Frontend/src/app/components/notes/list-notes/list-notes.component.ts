import { Component, } from '@angular/core';
import { Notes } from '../../../interfaces/notes';
import { NoteService } from '../../../services/note.service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../interfaces/api';
import { RouterModule } from '@angular/router';
import { NoteStatus } from '../../../constants/common.constants';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.css'
})
export class ListNotesComponent {

  notes:Notes[]=[];
  statusTypes = Object.values(NoteStatus);
  form: FormGroup;
  constructor(public notesService:NoteService){
    // Initialize FormGroup in constructor
    this.form = new FormGroup({
      title: new FormControl(''),
      status: new FormControl('')
    });
  }


   // Getter methods to return typed FormControls or new one
   get titleControl(): FormControl {
    return this.form.get('title') as FormControl || new FormControl('');
  }
  
  get statusControl(): FormControl {
    return this.form.get('status') as FormControl || new FormControl('');
  }

  //for fetching data on render
  ngOnInit(): void {
    this.getNotes();


     // Subscribe to title input changes
     this.titleControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.getNotesByFilters();
    });

    // Subscribe to status dropdown changes
    this.statusControl.valueChanges.subscribe((value) => {
      this.getNotesByFilters();
    });
  }

   // Fetch all notes initially
   getNotes(): void {
    this.notesService.getNotes().subscribe(
      (data: ApiResponse) => {
        console.log("data", data);
        this.notes = data.notes;
      },
      error => {
        console.error("Error fetching notes", error);
      }
    );
  }


//get notes by search or status filter
  getNotesByFilters():void{
    const title = this.form?.get('title')?.value || '';
    const status = this.form?.get('status')?.value || '';
    
    this.notesService.getNotesByFiler({title,status}).subscribe(
      (data: ApiResponse) => {
        console.log("data==>",data);
        this.notes = data.notes;
      },
      error => {
        console.error("Error fetching notes", error);
      }
    )
  }

  deleteNote(id:number  | undefined):void{
    if (id === undefined) {
      console.error('Note ID is undefined');
      return;
    }
    this.notesService.deleteNote(id).subscribe(()=>{
      this.notes= this.notes.filter(item=> item.id !== id);
    })
  }
}
