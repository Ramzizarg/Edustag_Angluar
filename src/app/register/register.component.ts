import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/AuthService';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      () => {
        this.successMessage = 'Registration successful! Please log in.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 3000); // Redirect after 3 seconds
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }
}
