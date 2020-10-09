import { Component, OnInit } from '@angular/core';
import { PlaylistsMock } from 'src/app/mock/playlistsMock';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  mock: PlaylistsMock
  service: PlaylistClicadaService
  
  constructor(service: PlaylistClicadaService) {
    this.mock = new PlaylistsMock
    this.service = service
  }

  ngOnInit(): void {

  }

  castIndex(index: Number){
    let aux = index

    return Number(aux)
  }

}
