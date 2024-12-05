import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = ''; // To hold the email input by the user
  message: string = ''; // To display success or error messages

  handlePasswordReset() {
    if (!this.email) {
      this.message = 'Please enter a valid email address.';
      return;
    }

    setTimeout(() => {
      this.message = 'Password reset link sent to your email.';
      this.email = ''; // Clear the input field
    }, 1000);
  }
}
