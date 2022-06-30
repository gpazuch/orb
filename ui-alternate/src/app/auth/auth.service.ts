import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenDomains, TokenService } from './token.service';

export interface User {
  id?: string;
  email?: string;
  password?: string;
  metadata?: Object;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenService,
  ) { }

  register(user: User) {
    this.http.post<HttpResponse<null>>(environment.users, user, {observe: 'response'})
    .pipe(
      catchError(error => error),
      tap((body: any) => {
        if(body?.token){
          this.token.setToken(body.token, TokenDomains.OrbAPI);
        }
      }),
      switchMap(() => this.login(user)),
    )
  }

  login(user: User) {
    return this.http.post(environment.login, user)
    .pipe(
      tap((body: any) => {
        if(body?.token){
          this.token.setToken(body.token, TokenDomains.OrbAPI);
        }
      }),
      catchError(error=>error));
  }

  logout() {
    window.sessionStorage.clear();
  }

  forgotPassword() {

  }

  resetPassword() {

  }
}
