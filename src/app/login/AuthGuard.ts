import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      // Check role
      const roles = this.authService.getRoles().map(role => role.name); // Adjust based on actual role structure
      if (roles.includes('TEACHER')) {
        this.router.navigate(['/teacher']);
      } else if (roles.includes('STUDENT')) {
        this.router.navigate(['/student']);
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
