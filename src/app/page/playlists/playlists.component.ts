import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Musica } from 'src/app/entidades/musica';
import { Playlist } from 'src/app/entidades/playlist';
import { Usuario } from 'src/app/entidades/usuario';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[]
  userPlaylistsSubject: BehaviorSubject<Playlist[]>
  userPlaylists$: Observable<Playlist[]>
  form: FormGroup
  isLoggedIn$: Observable<boolean>;
  user: Usuario

  constructor(private usersService: UsersService, private playlistsService: PlaylistsService, private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.userPlaylistsSubject = new BehaviorSubject<Playlist[]>([])
    this.userPlaylists$ = this.userPlaylistsSubject.asObservable()
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.usersService.isLoggedIn();

    this.form = this.formBuilder.group({
      "playlistName": new FormControl('', Validators.required)
    })

    if (this.usersService.getLocalUser() != null) {
      this.user = this.usersService.getLocalUser()

      this.updateUserPlaylists()
    }

    this.playlistsService.getPublicPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists
    })
  }

  get playlistName() {
    return this.form.get('playlistName')
  }

  criarPlaylist() {
    let newPlaylist

    if (this.userPlaylistsSubject.getValue()[0] != undefined) { 
      newPlaylist = { id: this.userPlaylistsSubject.getValue()[this.userPlaylistsSubject.getValue().length - 1].id+1, nome: this.playlistName.value, musicas: [] as number[], capa: "assets/images/capas/spotify-playlist-default-logo.png", isPublic: false, userId: this.user.id } 
    } else { 
      newPlaylist = { id: this.playlists.length, nome: this.playlistName.value, musicas: [] as number[], capa: "assets/images/capas/spotify-playlist-default-logo.png", isPublic: false, userId: this.user.id }
    }

    this.user.playlists.push(newPlaylist)

    this.usersService.updateUser(this.user).subscribe()
  }

  updateUserPlaylists() {
    this.userPlaylistsSubject.next(this.user.playlists)

    /*this.playlistsService.getPlaylistsFromUser(this.user.id).subscribe((playlists: Playlist[]) => {
      this.userPlaylistsSubject.next(playlists)
    })*/
  }
}
