import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./AuthService";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Navigate to appropriate route based on roles
        if (this.authService.hasRole('ROLE_STUDENT')) {
          this.router.navigate(['/student']);
        } else if (this.authService.hasRole('ROLE_TEACHER')) {
          this.router.navigate(['/teacher']);
        } else {
          this.errorMessage = 'Unauthorized access';
        }
      },
      error: err => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}
