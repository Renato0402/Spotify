import { Injectable } from '@angular/core';
import { Playlist } from '../entidades/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistClicadaService {
  index: number
  playlist: Playlist

  constructor() { }
}
