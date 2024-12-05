import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from './CourseService';
import { AuthService } from '../login/AuthService';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  courseForm: FormGroup;
  isEditMode = false;
  currentCourseId: number | null = null;
  userId: string | null = null;

  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      teacherId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      courses => {
        this.courses = courses;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  createCourse(): void {
    if (this.courseForm.valid && this.userId) {
      const formData = this.courseForm.value;
      const newCourse: Course = new Course(
        0,
        formData.title,
        formData.description,
        formData.startTime,
        formData.endTime,
        this.userId
      );

      this.courseService.createCourse(this.userId, newCourse).subscribe(
        course => {
          console.log('Course created successfully:', course);
          this.clearForm();
          this.getAllCourses();
        },
        error => {
          console.error('Error creating course:', error);
        }
      );
    } else {
      console.error('Course form is invalid or userId is null.');
    }
  }

  editCourse(course: Course): void {
    this.isEditMode = true;
    this.currentCourseId = course.id;
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      startTime: course.startTime,
      endTime: course.endTime,
      teacherId: this.userId
    });
  }

  updateCourse(): void {
    if (this.courseForm.valid && this.currentCourseId !== null && this.userId) {
      const formData = this.courseForm.value;
      const updatedCourse: Course = new Course(
        this.currentCourseId,
        formData.title,
        formData.description,
        formData.startTime,
        formData.endTime,
        this.userId
      );

      this.courseService.updateCourse(this.currentCourseId, updatedCourse).subscribe(
        course => {
          console.log('Course updated successfully:', course);
          this.clearForm();
          this.getAllCourses();
          this.isEditMode = false;
          this.currentCourseId = null;
        },
        error => {
          console.error('Error updating course:', error);
        }
      );
    } else {
      console.error('Course form is invalid, currentCourseId is null, or userId is null.');
    }
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(
        () => {
          console.log('Course deleted successfully');
          this.getAllCourses();
        },
        error => {
          console.error('Error deleting course:', error);
        }
      );
    }
  }

  clearForm(): void {
    this.courseForm.reset({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      teacherId: this.userId
    });
    this.isEditMode = false;
    this.currentCourseId = null;
  }
}
