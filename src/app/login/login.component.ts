import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.role === 'STUDENT') {
          this.router.navigate(['/student']);
        } else if (response.role === 'TEACHER') {
          this.router.navigate(['/teacher']);
        } else {
          console.error('Unknown role:', response.role);
        }
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
}
