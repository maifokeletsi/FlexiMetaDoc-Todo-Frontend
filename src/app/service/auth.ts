// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {  RegisterUserRequestDto } from '../dtos/RegisterUserRequestDto';
import { RegisterUserResponseDto } from '../dtos/RegisterUserResponseDto';
import { LoginResponseDto } from '../dtos/LoginResponseDto';
import { LoginRequestDto } from '../dtos/LoginRequestDto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7115/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  register(request: RegisterUserRequestDto): Observable<RegisterUserResponseDto> {
    return this.http.post<RegisterUserResponseDto>(`${this.apiUrl}/register`, request)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
