// course.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8089/' // Replace with your actual API URL
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = `${environment.apiUrl}/teacher/courses`;

  constructor(private http: HttpClient) {}

  createCourse(courseData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, courseData);
  }
}
