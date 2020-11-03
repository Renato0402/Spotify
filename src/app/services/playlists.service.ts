
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Musica } from '../entidades/musica';
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

  getPublicPlaylists(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(this.url).pipe(map(items =>
      items.filter(item => item.isPublic)))
  }

  getPublicPlaylistsFromUser(id: number): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(this.url).pipe(map(items =>
      items.filter(item => item.id = id)))
  }

  getPlaylistsById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(this.url + '/' + id)
  }

  savePlaylists(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(this.url, JSON.stringify(playlist), this.httpOptions)
  }

  deletePlaylist(playlists: Playlist) {
    return this.httpClient.delete<Playlist>(this.url + '/' + playlists.id, this.httpOptions)
  }
}
