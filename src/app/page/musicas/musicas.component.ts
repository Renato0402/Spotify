import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistsMock } from 'src/app/mock/playlistsMock';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';
import ColorThief from 'colorthief/dist/color-thief.min.js';
import { Musica } from 'src/app/entidades/musica';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

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
  lastMusicId: number

  constructor(service: PlaylistClicadaService, private router: Router) {
    this.mock = new PlaylistsMock
    this.service = service
    this.isPlayingMusic = false
  }

  ngOnInit(): void {
    this.coverBackground()

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        //console.log("entrou")
      }

      if (event instanceof NavigationEnd) {
        //playPause(this.lastMusicId)
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
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
    let button = <HTMLImageElement>document.getElementById("button" + id)

    if (this.isPlayingMusic && button.currentSrc == "http://localhost:4200/assets/images/icons/pause-button.png") {
      let lastButton = <HTMLImageElement>document.getElementById("button" + this.lastMusicId)
      lastButton.src = "assets/images/icons/play-button.png"

      this.audio.pause()

      this.isPlayingMusic = false

      button.src = "assets/images/icons/play-button.png"
    } else {
      if (this.audio != undefined) {
        this.audio.pause()

        let lastButton = <HTMLImageElement>document.getElementById("button" + this.lastMusicId)
        lastButton.src = "assets/images/icons/play-button.png"
      }

      this.audio = new Audio(this.mock.playlists[this.service.index].musicas[id].audio);
      this.audio.play()
      this.audio.volume = 0.5

      this.isPlayingMusic = true

      button.src = "assets/images/icons/pause-button.png"

      this.lastMusicId = id
    }
  }

  formatDuration(duration: number) {
    let formattedDuration = String(Math.round((duration / 60000) * 100) / 100).split(".")

    if (formattedDuration[1].length < 2) {
      formattedDuration[1] = formattedDuration[1] + "0"
    }

    return String(formattedDuration).replace(",", ":")
  }
}
