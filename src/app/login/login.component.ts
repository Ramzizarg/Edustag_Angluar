import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Redirect to the respective page if the user is already logged in
    const role = this.authService.getRole();
    const userId = this.authService.getUserId();
    if (role && userId) {
      if (role === 'ROLE_STUDENT') {
        this.router.navigate(['/student', userId]);
      } else if (role === 'ROLE_TEACHER') {
        this.router.navigate(['/teacher', userId]);
      }
    }
  }

  navigateToForgetPassword(): void {
    this.router.navigate(['/forgetpassword']); // Adjust the route as per your application's routing setup
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        const userId = this.authService.getUserId();
        if (!userId) {
          this.errorMessage = 'Login failed: User ID is undefined.';
          console.error('Login failed: User ID is undefined.');
          return;
        }

        const role = this.authService.getRole();
        if (role === 'ROLE_STUDENT') {
          this.router.navigate(['/student', userId]);
        } else if (role === 'ROLE_TEACHER') {
          this.router.navigate(['/teacher', userId]);
        } else {
          this.errorMessage = 'Login failed: Unknown role.';
          console.error('Login failed: Unknown role:', role);
        }
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
          console.error('Login error:', error);
        }
      }
    );
  }
}
