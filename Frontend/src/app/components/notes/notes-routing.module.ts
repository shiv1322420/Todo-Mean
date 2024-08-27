import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';


const routes: Routes = [
    { path: '', component: ListNotesComponent },
    { path: ':id/view', component: ViewNotesComponent },
    { path: 'create', component: CreateNotesComponent },
    { path: ':id/edit', component: EditNotesComponent }
  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NotesRoutingModule { }