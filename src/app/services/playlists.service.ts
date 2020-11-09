
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
  urlUser

  constructor(private httpClient: HttpClient) {
    this.urlPublic = "http://localhost:3000/publicPlaylists"
    this.urlUser = "http://localhost:3000/userPlaylists"
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

  getPlaylistsFromUser(id: string): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(this.urlUser).pipe(map(items =>
      items.filter(item => item.userId == id)))
  }

  getPublicPlaylistsById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(this.urlPublic + '/' + id)
  }

  getUserPlaylistsById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(this.urlUser + '/' + id)
  }

  updatePlaylist(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.put<Playlist>(this.urlUser + "/" + playlist.id, JSON.stringify(playlist), this.httpOptions)
  }

  addPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(this.urlUser, JSON.stringify(playlist), this.httpOptions)
  }

  addPublicPlaylists(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(this.urlPublic, JSON.stringify(playlist), this.httpOptions)
  }

  deleteUserPlaylist(playlist: Playlist) {
    return this.httpClient.delete<Playlist>(this.urlUser + '/' + playlist.id, this.httpOptions)
  }
}
