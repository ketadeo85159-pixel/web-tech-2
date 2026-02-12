import { Component, OnInit, signal } from '@angular/core';
import { StudentsService } from '../../services/students/students.service';
import { GetStudent } from '../../models/student.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  students = signal<GetStudent[]>([]);

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
