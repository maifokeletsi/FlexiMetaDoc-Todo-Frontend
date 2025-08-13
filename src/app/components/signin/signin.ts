import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequestDto } from '../../dtos/RegisterUserRequestDto';
import { AuthService } from '../../service/auth';
import { LoginResponseDto } from '../../dtos/LoginResponseDto';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],  // fixed plural here
})
export class Signin {
  private router = inject(Router);
  private location = inject(Location);

  constructor(private authService: AuthService) {}

  request: RegisterUserRequestDto = {
      email: '',
      password: ''
    };

  error = '';
  success = '';
  isLoading = false;

  onSignIn() {
    this.error = '';
    this.success = '';

    if (!this.request.email  || this.request.email.length < 3 || this.request.email.length > 30) {
      this.error = 'Username must be between 3 and 30 characters.';
      return;
    }

    if (!this.request.password || this.request.password.length < 6 || this.request.password.length > 50) {
      this.error = 'Password must be between 6 and 50 characters.';
      return;
    }

        this.isLoading = true;
        this.error = '';
        this.success = '';
    
        this.authService.login(this.request).subscribe({
          next: (response: LoginResponseDto) => {
            this.success = `Successfully LoggedIn Welcome ${response.token}`;
            this.isLoading = false;
            this.router.navigate(['/todo']);
          },
          error: (err) => {
            this.error = 'Registration failed: ' + (err.error?.message || 'Unknown error');
            this.isLoading = false;
          }
        });

      // Navigate to todo page after successful sign-in
       this.router.navigate(['/todo']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
