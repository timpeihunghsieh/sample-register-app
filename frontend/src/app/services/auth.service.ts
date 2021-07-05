import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService;
  authToken: any;
  user: any;

  baseUri:string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    // TODO(timhsieh): Find a way to inject JwtHelperService.
    this.jwtHelper = new JwtHelperService();
  }

  registerUser(user: any): Observable<any> {
    let url = `${this.baseUri}/users/register`;
    return this.http.post(
        'http://localhost:3000/users/register', user,
        {headers: this.headers})
      .pipe(map((res: any) => {
        return res;
      }));
  }

  authenticateUse(user: any): Observable<any> {
    let url = `${this.baseUri}/users/authenticate`;

    return this.http.post(
        url, user,
        {headers: this.headers})
      .pipe(map((res: any) => {
        return res;
      }));
  }

  storeUserData(token: string, user: any): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(): boolean {
    // TODO(timhsieh): Note that each call to this method would mean
    // a call to localStorage.
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    const token = localStorage.getItem('id_token') || "";
    return token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}