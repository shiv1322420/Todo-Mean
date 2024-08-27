import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteService } from '../../../services/note.service';
import { NoteStatus } from '../../../constants/common.constants';
import { ApiResponse } from '../../../interfaces/api';

@Component({
  selector: 'app-view-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent {
  id!: number;
  form!: FormGroup;
  statusTypes = Object.values(NoteStatus);

  constructor(
    public notesService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.notesService.getNoteById(this.id).subscribe((data:any) => {
      let note=data.note;
      this.form = new FormGroup({
        title: new FormControl(note.title),
        description: new FormControl(note.description),
        status: new FormControl({value:note.status,disabled: true}),
      });
    });
  }

  get formControls() {
    return this.form.controls;
  }
}
