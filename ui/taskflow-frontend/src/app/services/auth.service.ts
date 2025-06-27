import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7244/api/Auth';
  private tokenKey = 'authToken';
  private currentUser: any = null;

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.setUser(response.token);
          this.loggedIn.next(true); // ✅ notify login
        }
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUser = null;
    this.loggedIn.next(false); // ✅ notify logout
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); // ✅ allows .subscribe()
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setUser(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUser = {
        username: payload.unique_name || payload.name,
        userId: payload.nameid,
        role: payload.role
      };
    } catch {
      this.currentUser = null;
    }
  }

  getUser(): any {
    return this.currentUser;
  }
}
