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
    localStorage.clear()
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  saveUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.userKey));
  }
}
