async deleteStudent(studentId: string) {
  this.studentService.deleteStudent(studentId).subscribe({
    next: () => {
      const updated = this.students().filter(s => s.id !== studentId);
      this.students.set(updated);
    },
    error: (err) => console.error(err)
  });
}
