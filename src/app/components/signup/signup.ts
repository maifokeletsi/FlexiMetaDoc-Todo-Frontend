import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequestDto } from '../../dtos/RegisterUserRequestDto';
import { AuthService } from '../../service/auth';
import { RegisterUserResponseDto } from '../../dtos/RegisterUserResponseDto';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  private router = inject(Router);
  constructor(private authService: AuthService) {}

  request: RegisterUserRequestDto = {
    email: '',
    password: ''
  };

  error = '';
  success = '';
  isLoading = false;

  

  onRegister(): void {
    if (!this.request.email  || this.request.email.length < 3 || this.request.email.length > 30) {
      this.error = 'Username must be between 3 and 30 characters.';
      return;
    }

    if (!this.request.password || this.request.password.length < 6 || this.request.password.length > 50) {
      this.error = 'Password must be between 6 and 50 characters.';
      return;
    }

    // Mock successful sign-in
    this.success = `Welcome back, ${this.request.email}!`;


    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.authService.register(this.request).subscribe({
      next: (response: RegisterUserResponseDto) => {
        this.success = `Registration successful! Welcome ${response.token}`;
        this.isLoading = false;
        this.router.navigate(['/todo']);
      },
      error: (err) => {
        this.error = 'Registration failed: ' + (err.error?.message || 'Unknown error');
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
