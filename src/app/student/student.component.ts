import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  standalone: true,
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  courses: Course[] = [];
  errorMessage: string | null = null;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.reservationService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error) => {
        this.errorMessage = 'Error loading courses';
        console.error('Error loading courses', error);
      }
    );
  }

  reserveCourse(courseId: number): void {
    this.reservationService.reserveCourse(courseId).subscribe(
      (response) => {
        alert('Course reserved successfully!');
        this.loadCourses(); // Reload courses to reflect any changes
      },
      (error) => {
        this.errorMessage = 'Error reserving course';
        console.error('Error reserving course', error);
      }
    );
  }
}
