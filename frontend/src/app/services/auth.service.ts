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
}