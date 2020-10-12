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
  isPlayingMusic: Boolean
  audio: HTMLAudioElement
  require: any
  
  constructor(service: PlaylistClicadaService) {
    this.mock = new PlaylistsMock
    this.service = service
    this.isPlayingMusic = false
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

  playPause(id: number){
    let button = <HTMLImageElement>document.getElementById("button ")

    if(this.isPlayingMusic){
      this.audio.pause

      this.isPlayingMusic = false

      button.src = "assets/images/icons/play-button.png"
    }else{
      console.log(this.mock.playlists[this.service.index].musicas[id].audio)
      this.audio = new Audio(this.mock.playlists[this.service.index].musicas[id].audio);
      //this.audio = new Audio("./assets/musics/Playlists/TrapNation/FabianMazur&Snavs-Arena[Trap].mp3");

      this.audio.addEventListener("load", () => {
        this.audio.play
      })

      this.isPlayingMusic = true

      button.src = "assets/images/icons/pause-button.png"
    }
  }
}
