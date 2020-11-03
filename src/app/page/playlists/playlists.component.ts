import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/entidades/playlist';
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
  playlists: Playlist[]
  playlist: Playlist

  constructor(service: PlaylistClicadaService, playlistsService: PlaylistsService) {
    this.playlistsService = playlistsService
    this.service = service
    this.playlist = {} as Playlist
  }

  ngOnInit(): void {
    this.playlistsService.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists
    })
  }

  setMusicIndex(index: number){
    this.service.playlist = this.playlists[index]
  }
}
