import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDomains, TokenService } from './token.service';

export const TOKEN_HEADER = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.token.retrieveToken(TokenDomains.OrbAPI);
    if (token !== null) {
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_HEADER, 'Bearer ' + token),
      });
    }

    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
