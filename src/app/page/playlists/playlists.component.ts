import { Component, OnInit } from '@angular/core';
import { Musica } from 'src/app/entidades/musica';
import { Playlist } from 'src/app/entidades/playlist';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[]
  playlist: Playlist

  constructor(private playlistsService: PlaylistsService) {
    this.playlist = {} as Playlist
  }

  ngOnInit(): void {
    this.playlistsService.getPublicPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists
    })
  }
}
