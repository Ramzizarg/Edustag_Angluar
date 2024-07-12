import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.roles; // Retrieve expected roles from route data

    if (this.authService.isLoggedIn() && expectedRole.includes(this.authService.getRole())) {
      return true; // Allow access if user is logged in and has the expected role
    }

    // Redirect to login page or unauthorized page
    this.router.navigate(['/login']);
    return false;
  }
}
