import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../services/students/students.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html'
})
export class CreateStudentComponent {

  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService
  ) {
    this.studentForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      course: ['', Validators.required],
      year_level: ['', Validators.required],
      gap: ['', Validators.required],
      enrollment_status: ['1']
    });
  }

  async createStudent() {
    if (this.studentForm.invalid) return;

    this.studentService.createStudent(this.studentForm.value).subscribe({
      next: () => {
        alert('Student Created Successfully');
        this.studentForm.reset();
      },
      error: (err) => console.error(err)
    });
  }
}
