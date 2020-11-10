
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../entidades/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  urlPublic

  constructor(private httpClient: HttpClient) {
    this.urlPublic = "http://localhost:3000/publicPlaylists"
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPaylists() {
    return this.httpClient.get<Playlist[]>(this.urlPublic)
  }

  getPublicPlaylists(): Observable<any> {
    return this.httpClient.get<any>(this.urlPublic)
  }

  getPublicPlaylistsById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(this.urlPublic + '/' + id)
  }

  addPublicPlaylists(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(this.urlPublic, JSON.stringify(playlist), this.httpOptions)
  }
}
