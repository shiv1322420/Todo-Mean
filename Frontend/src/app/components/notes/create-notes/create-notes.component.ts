import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note.service';
import { NoteStatus, NoteStatusType } from '../../../constants/common.constants';
import { ApiResponse } from '../../../interfaces/api';
@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.css'
})
export class CreateNotesComponent {
  form!: FormGroup;   //form should not null and should be type of FormGroup
  statusTypes = Object.values(NoteStatus);

  constructor(public notesService:NoteService, private router:Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      status: new FormControl(this.statusTypes[0], Validators.required) // Set default value to first status
    });
  }

  //get form values
  get formControls(){
    return this.form.controls;
  }

  submit(){
    if(this.form.valid){
     this.notesService.createNote(this.form.value).subscribe(
      (res:any)=>{
        this.router.navigateByUrl('/notes');
      }
     )
    }
  }

}
