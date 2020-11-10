import { Component, OnDestroy, OnInit } from '@angular/core';
import ColorThief from 'colorthief/dist/color-thief.min.js';
import { Musica } from 'src/app/entidades/musica';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { MusicasService } from 'src/app/services/musicas.service';
import { Playlist } from 'src/app/entidades/playlist';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  musicasService: MusicasService
  playlist: Playlist
  musicasSubject: BehaviorSubject<Musica[]>
  musicas$: Observable<Musica[]>
  foundMusics: Musica[]
  musica: Musica
  isPlayingMusic: Boolean
  audio: HTMLAudioElement
  lastMusicId: number
  form: FormGroup
  isOnPage = true
  searchButtomClickedSubject: BehaviorSubject<boolean>
  searchButtomClicked$: Observable<boolean>
  musicaToRemove

  constructor(private usersService: UsersService, private playlistsService: PlaylistsService, musicasService: MusicasService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.musicasService = musicasService
    this.playlist = new Playlist()
    this.isPlayingMusic = false
    this.musica = {} as Musica
    this.musicasSubject = new BehaviorSubject<Musica[]>([])
    this.musicas$ = this.musicasSubject.asObservable()
    this.searchButtomClickedSubject = new BehaviorSubject<boolean>(false)
    this.searchButtomClicked$ = this.searchButtomClickedSubject.asObservable()
  }

  ngOnInit(): void {
    this.coverBackground()

    this.form = this.formBuilder.group({
      "searchInput": new FormControl('', Validators.required)
    })

    if (this.activatedRoute.snapshot.params.id < 6) {
      this.playlistsService.getPublicPlaylistsById(this.activatedRoute.snapshot.params.id).subscribe((playlist: Playlist) => {
        this.playlist = playlist

        if (playlist.musicas != null) {
          for (let i = 0; i < this.playlist.musicas.length; i++) {
            this.musicasService.getMusicaById(this.playlist.musicas[i]).subscribe((musica: Musica) => {
              this.musicasSubject.getValue().push(musica)
            })
          }
        }
      })
    } else {
      this.usersService.getLocalUser().playlists.filter((value: Playlist) => {
        if (value.id == this.activatedRoute.snapshot.params.id) {
          this.playlist = value
        }
      })

      this.playlist.musicas.forEach((value: number) => {
        this.musicasService.getMusicaById(value).subscribe((musica: Musica) => {
          this.musicasSubject.getValue().push(musica)
        })
      })
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url != "/musicas" && this.isOnPage && this.isPlayingMusic) {
        this.playPause(this.lastMusicId)

        this.isOnPage = false
      }
    });
  }

  get searchInput() {
    return this.form.get('searchInput')
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
        this.audio = new Audio(this.musicasSubject.getValue()[index].audio);
        this.audio.play()
        this.audio.volume = 0.3

        this.isPlayingMusic = true

        button.src = "assets/images/icons/pause-button.png"

        this.lastMusicId = id
      }
    } else {
      this.audio.pause()
    }
  }

  getMusicaIndex(id: number): number {
    let indexFound;

    this.musicasSubject.getValue().filter((value: Musica, index: number, array: Musica[]) => {
      if (value.id == id) {
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

  searchMusica() {
    this.musicasService.getMusicaByNameOrArtist(this.searchInput.value).subscribe((musicas: Musica[]) => {
      this.foundMusics = musicas
      this.searchButtomClickedSubject.next(true)
    })
  }

  addMusic(index: number) {
    this.musicasSubject.getValue().push(this.foundMusics[index])

    let user = this.usersService.getLocalUser()
    let index2
    user.playlists.filter((value: Playlist, index: number) => {
      if(value.id == this.playlist.id){
        index2 = index
      }
    })

    this.playlist.musicas.push(this.foundMusics[index].id)

    user.playlists[index2] = this.playlist

    this.usersService.updateUser(user).subscribe()
  }

  removeMusic() {
    this.playlist.musicas.splice(this.musicaToRemove, 1)

    let index1

    this.musicasSubject.getValue().filter((value: Musica, index: number) => {
      if(index == this.musicaToRemove){
        index1 = index
      }
    })

    this.musicasSubject.getValue().splice(index1, 1)

    let user = this.usersService.getLocalUser()
    let index2
    user.playlists.filter((value: Playlist, index: number) => {
      if(value.id == this.playlist.id){
        index2 = index
      }
    })

    user.playlists[index2] = this.playlist

    this.usersService.updateUser(user).subscribe()
  }

  deletePlaylist() {
    let index

    this.usersService.getLocalUser().playlists.filter((value: Playlist, i: number) => {
      if(value.id == this.playlist.id){
        index = i
      }
    })

    let user = this.usersService.getLocalUser()
    user.playlists.splice(index, 1)

    this.usersService.updateUser(user).subscribe()

    this.router.navigate(['/playlists']);
  
    //this.playlistsService.deleteUserPlaylist(this.playlist).subscribe()
  }
}