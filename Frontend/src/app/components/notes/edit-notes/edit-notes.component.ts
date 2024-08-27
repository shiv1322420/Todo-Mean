import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Notes } from '../../../interfaces/notes';
import { NoteService } from '../../../services/note.service';
import { NoteStatus } from '../../../constants/common.constants';
import { ApiResponse } from '../../../interfaces/api';

@Component({
  selector: 'app-edit-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-notes.component.html',
  styleUrl: './edit-notes.component.css'
})
export class EditNotesComponent {
  id!: number;
  note!: Notes;
  form!: FormGroup;
  statusTypes = Object.values(NoteStatus);

  constructor(
    public notesService:NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit():void{
     //get id from params and call get api to show data
  this.id = this.route.snapshot.params['id'];
  this.notesService.getNoteById(this.id).subscribe((data:any)=>{
   this.note= data.note;
   
  });

  //adding valdation
  this.form= new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    status: new FormControl(this.statusTypes[0], Validators.required),
  });
  }

  
  get formControls() {
    return this.form.controls;
  }

  submit(){
    this.notesService.updateNote(this.id,this.form.value).subscribe((res:any)=>{
      this.router.navigateByUrl('/notes');
    })
  }
}
