import {RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    {
        path: 'notes',
        loadChildren: () => import('./components/notes/notes.module').then(m => m.NotesModule)
    },
    { path: '**', redirectTo: 'notes' } // Fallback route for unknown paths
];
