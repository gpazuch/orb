import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export enum TokenDomains {
  OrbAPI = 'orb-auth-token',
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public jwt: JwtHelperService = new JwtHelperService();

  constructor() { }

  setToken(token: string, domain: TokenDomains) {
    window.sessionStorage.removeItem(domain);
    window.sessionStorage.setItem(domain, token);
  }

  retrieveToken(domain: TokenDomains): string | undefined {
    return window.sessionStorage.getItem(domain) || undefined;
  }

  clear() {
    window.sessionStorage.clear();
  }

  isExpired(domain: TokenDomains): boolean {
    const token = this.retrieveToken(domain);
    return this.jwt.isTokenExpired(token);
  }

  expireDate(domain: TokenDomains) {
    const token = this.retrieveToken(domain);
    return this.jwt.getTokenExpirationDate(token);
  }
}
