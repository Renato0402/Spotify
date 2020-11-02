import { Injectable } from '@angular/core';
import { PlaylistsMock } from '../mock/playlistsMock';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  playlistsMock

  constructor(playlistsMock: PlaylistsMock) { 
    this.playlistsMock = playlistsMock
  }
}
