import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Role {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8089/api/';

  constructor(private http: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { email, password }, this.httpOptions)
      .pipe(
        tap(res => {
          if (res && res.accessToken) {
            this.saveToken(res.accessToken);
            this.saveRoles(res.roles);
            console.log('Token stored');
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveRoles(roles: string[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRoles(): Role[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  hasRole(role: string): boolean {
    const roles = this.getRoles();
    console.log('Checking role:', role, 'Available roles:', roles);
    return roles.some(r => r.name === role); // Adjust logic based on role structure
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return tokenPayload.id;
  }
}
