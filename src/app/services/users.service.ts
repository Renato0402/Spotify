import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { Playlist } from '../entidades/playlist';
import { Usuario } from '../entidades/usuario';
import { UsersMock } from '../mock/usersMock';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url;
  private loggedIn

  constructor(private httpClient: HttpClient, private router: Router) {
    this.url = "http://localhost:3000/users"

    if(this.getLocalUser() != null){
      this.loggedIn = new BehaviorSubject<boolean>(true);
    }else{
      this.loggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserByEmail(email: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url).pipe(map(items =>
      items.filter(item => item.email == email)))
  }

  checkPassword(email: string, password: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url).pipe(map(items =>
      items.filter(item => item.email == email && item.senha == password)))
  }

  addUser(user: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(user), this.httpOptions)
  }

  updateUser(user: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.url, JSON.stringify(user), this.httpOptions)
  }

  login(email: string, password: string) {
    this.checkPassword(email, password).subscribe((user: Usuario[]) => {
      localStorage.setItem('user', JSON.stringify(user[0]));
      //this.user.next(String(user))
      this.loggedIn.next(true)
      this.router.navigate(['/']);
    })
  }

  logout(){
    localStorage.clear()
    this.loggedIn.next(false)
    this.router.navigate(['/entrar']);
  }

  getLocalUser(){
    return JSON.parse(localStorage.getItem('user'))
  }
}
