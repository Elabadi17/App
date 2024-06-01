import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Change this to your actual API endpoint
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generateToken`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.saveToken(response.token);
          }
        })
      );
  }
  

  // Method to check if user is active
  isUserActive(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}/isUserActive`, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      // Handle the case where localStorage is not available
     return false;
    }
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getRoles(): string[] {
    if (typeof localStorage === 'undefined') {
      // Handle the case where localStorage is not available
      return [];
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.roles ? decodedToken.roles.split(',') : [];
  }

  getId(): string[] {
    if (typeof localStorage === 'undefined') {
      // Handle the case where localStorage is not available
      return [];
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.roles ? decodedToken.id.split(',') : [];
  }
  

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }

  isUser(): boolean {
    return this.getRoles().includes('ROLE_USER');
  }
}
