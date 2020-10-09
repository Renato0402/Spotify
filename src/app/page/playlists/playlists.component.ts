import { Component, OnInit } from '@angular/core';
import { Musica } from 'src/app/entidades/musica';
import { Playlist } from 'src/app/entidades/playlist';
import { PlaylistsMock } from 'src/app/mock/playlistsMock';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  mock: PlaylistsMock
  service: PlaylistClicadaService

  constructor(service: PlaylistClicadaService) {
    this.mock = new PlaylistsMock
    this.service = service
  }

  ngOnInit(): void {
    
  }

  setMusicIndex(index: Number){
    this.service.index = index
  }
}
