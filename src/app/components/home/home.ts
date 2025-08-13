import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private router = inject(Router);

  onSignIn() {
  // Handle sign-in logic or navigate
  console.log('Sign In clicked');
  this.router.navigate(['/signin']);
}

onSignUp() {
  // Handle sign-up logic or navigate
  this.router.navigate(['/signup'])
}
}
