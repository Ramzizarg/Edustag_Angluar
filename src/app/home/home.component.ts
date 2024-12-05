import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home',
  standalone: true, // Mark the component as standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected from `styleUrl` to `styleUrls`
})
export class HomeComponent {
  constructor(private router: Router) {} // Inject Router

  // Method to navigate to the login page
  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to /login route
  }
}
