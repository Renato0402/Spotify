import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';
import ColorThief from 'colorthief/dist/color-thief.min.js';
import { Musica } from 'src/app/entidades/musica';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  service: PlaylistClicadaService
  musicasService: MusicasService
  musicas: Musica[]
  musica: Musica
  isPlayingMusic: Boolean
  audio: HTMLAudioElement
  lastMusicId: number
  isOnPage = true

  constructor(service: PlaylistClicadaService, musicasService: MusicasService, private router: Router) {
    this.musicasService = musicasService
    this.service = service
    this.isPlayingMusic = false
    this.musicas = []
    this.musica = {} as Musica
  }

  ngOnInit(): void {
    this.coverBackground()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url != "/musicas" && this.isOnPage && this.isPlayingMusic) {
        this.playPause(this.lastMusicId)

        this.isOnPage = false
      }
    });

    let auxLength = this.service.playlist.musicas.length

    for(let i = this.service.playlist.musicas[0]; i <= this.service.playlist.musicas[auxLength-1]; i++){

      this.musicasService.getMusicaById(i).subscribe((musica: Musica) => {
        this.musicas.push(musica)
      })
    }
  }

  coverBackground() {
    let img = <HTMLImageElement>document.getElementById("coverBackground")

    img.onload = function () {
      let colorThief = new ColorThief();
      let color = colorThief.getColor(img)

      document.getElementById("header").style.backgroundImage = "linear-gradient(rgb(" + color + "), rgba(12, 12, 12, 0.966))"
    };
  }

  playPause(id: number) {
    let index = this.getMusicaIndex(id)

    let button = <HTMLImageElement>document.getElementById("button" + id)

    if (button != null) {
      if (this.isPlayingMusic && button.currentSrc == "http://localhost:4200/assets/images/icons/pause-button.png") {
        this.audio.pause()

        this.isPlayingMusic = false

        button.src = "assets/images/icons/play-button.png"
      } else {
        if (this.audio != undefined) {
          this.audio.pause()

          let lastButton = <HTMLImageElement>document.getElementById("button" + this.lastMusicId)
          lastButton.src = "assets/images/icons/play-button.png"
        }
          this.audio = new Audio(this.musicas[index].audio);
          this.audio.play()
          this.audio.volume = 0.5

          this.isPlayingMusic = true

          button.src = "assets/images/icons/pause-button.png"

          this.lastMusicId = id
      }
    }else{
      this.audio.pause()
    }
  }

  getMusicaIndex(id: number): number{
    let indexFound;

    this.musicas.filter((value: Musica, index: number, array: Musica[]) => {
      if(value.id == id){
        indexFound = index
      }
    })

    return indexFound
  }

  formatDuration(duration: number) {
    let formattedDuration = String(Math.round((duration / 60000) * 100) / 100).split(".")

    if (formattedDuration[1].length < 2) {
      formattedDuration[1] = formattedDuration[1] + "0"
    }

    return String(formattedDuration).replace(",", ":")
  }
}