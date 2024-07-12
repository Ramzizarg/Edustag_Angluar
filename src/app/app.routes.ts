import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import {AuthGuard} from "./login/AuthGuard";
import {CourseComponent} from "./course/course.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard], data: { roles: ['STUDENT'] } },
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard], data: { roles: ['TEACHER'] } },
  { path: '**', redirectTo: '/login' },
  {path: 'teacher/courses', component: CourseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
