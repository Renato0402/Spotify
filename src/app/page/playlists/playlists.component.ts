import { Component, OnInit } from '@angular/core';
import { Musica } from 'src/app/entidades/musica';
import { Playlist } from 'src/app/entidades/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[]

  constructor() { }

  ngOnInit(): void {
    this.playlists[0] = {id: 1, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "String"}
    this.playlists[1] = {id: 2, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "String"}
    this.playlists[2] = {id: 3, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "String"}
    this.playlists[3] = {id: 3, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "String"}
    this.playlists[4] = {id: 4, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "String"}
    this.playlists[5] = {id: 6, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "String"}

    let musica1: Musica = {id: 1, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    let musica2: Musica = {id: 2, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    let musica3: Musica = {id: 3, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}

    this.playlists[0].musicas.push(musica1)
    
  }

}
