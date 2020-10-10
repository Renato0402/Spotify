import { Component, OnInit } from '@angular/core';
import { PlaylistsMock } from 'src/app/mock/playlistsMock';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';
import ColorThief from 'colorthief/dist/color-thief.min.js';

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
    this.coverBackground()
  }

  coverBackground(){
    let img = <HTMLImageElement>document.getElementById("coverBackground")

    img.onload = function () {
      let colorThief = new ColorThief();
      let color = colorThief.getColor(img)

      document.getElementById("header").style.backgroundImage = "linear-gradient(rgb(" + color + "), rgba(12, 12, 12, 0.966))"
    };
  }

  castIndex(index: Number){
    let aux = index

    return Number(aux)
  }
}
