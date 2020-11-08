
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../entidades/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  url;

  constructor(private httpClient: HttpClient) {
    this.url = "http://localhost:3000/playlists"
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPaylists(){
    return this.httpClient.get<Playlist[]>(this.url)
  }

  getPublicPlaylists(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(this.url).pipe(map(items =>
      items.filter(item => item.isPublic)))
  }

  getPlaylistsFromUser(id: string): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(this.url).pipe(map(items =>
      items.filter(item => item.userId == id)))
  }

  getPlaylistsById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(this.url + '/' + id)
  }

  updatePlaylist(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.put<Playlist>(this.url + "/" + playlist.id, JSON.stringify(playlist), this.httpOptions)
  }

  addPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(this.url, JSON.stringify(playlist), this.httpOptions)
  }

  deletePlaylist(id: number) {
    return this.httpClient.delete(this.url + '/' + id, this.httpOptions)
  }
}
