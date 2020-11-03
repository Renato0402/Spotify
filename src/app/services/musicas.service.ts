import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musica } from '../entidades/musica';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {
  url;

  constructor(private httpClient: HttpClient) {
    this.url = "http://localhost:3000/musicas" 
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getMusicas(): Observable<Musica[]> {
    return this.httpClient.get<Musica[]>(this.url)
  }

  getMusicaById(id: number): Observable<Musica> {
    return this.httpClient.get<Musica>(this.url + '/' + id)
  }

  saveMusicas(playlist: Musica): Observable<Musica> {
    return this.httpClient.post<Musica>(this.url, JSON.stringify(playlist), this.httpOptions)
  }

  deleteMusica(playlists: Musica) {
    return this.httpClient.delete<Musica>(this.url + '/' + playlists.id, this.httpOptions)
  }
}