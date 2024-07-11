import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./login/AuthGuard";
import {StudentComponent} from "./student/student.component";
import {TeacherComponent} from "./teacher/teacher.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard], data: { role: 'STUDENT' } },
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard], data: { role: 'TEACHER' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
