import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // Optional: remove if you don't use a CSS file
  // styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.error = 'Username and password are required';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/tasks']); // Redirect to task list after login
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
