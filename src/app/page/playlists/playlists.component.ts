import { Component, OnInit } from '@angular/core';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlistsService: PlaylistsService
  service: PlaylistClicadaService

  constructor(service: PlaylistClicadaService, playlistsService: PlaylistsService) {
    this.playlistsService = playlistsService
    this.service = service
  }

  ngOnInit(): void {}

  setMusicIndex(index: number){
    this.service.index = index
  }

  get()
}
