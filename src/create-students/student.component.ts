import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {}
