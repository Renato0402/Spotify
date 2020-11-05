import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenKey
  userKey

  constructor() { 
    this.tokenKey = 'auth-token';
    this.userKey = 'auth-user';
  }

  logout(){
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.tokenKey);
  }

  saveUser(user) {
    window.sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem(this.userKey));
  }
}
