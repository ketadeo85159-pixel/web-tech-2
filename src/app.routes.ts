import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'prelim-exam',
    loadComponent: () =>
      import('./prelim-exam.component')
        .then(m => m.PrelimExamComponent)
  }
];
