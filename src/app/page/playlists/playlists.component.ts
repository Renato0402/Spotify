import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Musica } from 'src/app/entidades/musica';
import { Playlist } from 'src/app/entidades/playlist';
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
  userId: string

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
      this.userId = this.usersService.getLocalUser().id

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
      newPlaylist = { id: this.userPlaylistsSubject.getValue()[this.userPlaylistsSubject.getValue().length - 1].id+1, nome: this.playlistName.value, musicas: [] as number[], capa: "assets/images/capas/KnifeParty.jpg", isPublic: false, userId: this.userId } 
    } else { 
      newPlaylist = { id: this.playlists.length+1, nome: this.playlistName.value, musicas: [] as number[], capa: "assets/images/capas/KnifeParty.jpg", isPublic: false, userId: this.userId } 
    }



    this.playlistsService.addPlaylist(newPlaylist).subscribe(() => {
      this.userPlaylistsSubject.getValue().push(newPlaylist)

      this.form.reset()
    })
  }

  updateUserPlaylists() {
    this.playlistsService.getPlaylistsFromUser(this.userId).subscribe((playlists: Playlist[]) => {
      this.userPlaylistsSubject.next(playlists)
    })
  }
}
