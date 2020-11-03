import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../entidades/playlist';
import { Usuario } from '../entidades/usuario';
import { UsersMock } from '../mock/usersMock';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url;

  constructor(private httpClient: HttpClient) {
    this.url = "http://localhost:3000/users"
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUserByEmail(email: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url).pipe(map(items =>
      items.filter(item => item.email == email)))
  }

  addUser(user: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(user), this.httpOptions)
  }
}
