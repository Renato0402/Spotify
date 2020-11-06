import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  user = new Subject<string>();

  userlogged = this.user.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    this.url = "http://localhost:3000/users"
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUserByEmail(email: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url).pipe(map(items =>
      items.filter(item => item.email == email)))
  }

  checkPassword(email: string, password: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url).pipe(map(items =>
      items.filter(item => item.email == email && item.senha == password)))
  }

  login(email: string, password: string) {
    this.checkPassword(email, password).subscribe((user: Usuario[]) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user.next(String(user))

      this.router.navigate(['/']);
    })
  }

  addUser(user: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(user), this.httpOptions)
  }
}
