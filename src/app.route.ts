import { Routes } from '@angular/router';
import { StudentsComponent } from './student/students.component';
import { CreateStudentComponent } from '../create-students/create-student.components';

export const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'create-student', component: CreateStudentComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];