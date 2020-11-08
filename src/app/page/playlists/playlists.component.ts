import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  userPlaylists: Playlist[]
  form: FormGroup
  isLoggedIn$: Observable<boolean>;
  userId: string

  constructor(private usersService: UsersService, private playlistsService: PlaylistsService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.usersService.isLoggedIn();
    
    this.form = this.formBuilder.group({
      "playlistName": new FormControl('', Validators.required)
    })

    if(this.usersService.getLocalUser() != null){
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

  criarPlaylist(){
    this.playlistsService.getPaylists().subscribe((playlists: Playlist[]) => {
      let newPlaylist = {id: playlists.length, nome: this.playlistName.value, musicas: [] as number[], capa: null, isPublic: false, userId: this.userId}

      this.playlistsService.addPlaylist(newPlaylist).subscribe()

      this.updateUserPlaylists()
    })
  }


  updateUserPlaylists(){
      this.playlistsService.getPlaylistsFromUser(this.userId).subscribe((playlists: Playlist[]) => {
        this.userPlaylists = playlists
      })
  }
}
