import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../login/AuthService";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  userId: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Retrieve userId from AuthService
  }

  createCourse(): void {
    if (this.userId) {
      this.router.navigate([`/teacher/${this.userId}/create_course`]); // Navigate with userId
    } else {
      console.error('User ID is not available.'); // Handle scenario where userId is not available
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
