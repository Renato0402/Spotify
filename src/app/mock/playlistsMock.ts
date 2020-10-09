import { Component, OnInit } from '@angular/core'
import { Playlist } from '../entidades/playlist'

export class PlaylistsMock {
    playlists: Playlist[]

    constructor() {
        this.playlists = []

        this.playlists[0] = {id: 0, nome: "As 50 mais tocadas no mundo", musicas: [], capa: "assets/images/capas/Top50Global.jpg"}
        this.playlists[1] = {id: 1, nome: "Knife Party", musicas: [], capa: "assets/images/capas/KnifeParty.jpg"}
        this.playlists[2] = {id: 2, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "assets/images/capas/Top50Brasil.jpg"}
        this.playlists[3] = {id: 3, nome: "Só Track Boa 2020", musicas: [], capa: "assets/images/capas/SoTrackBoa.jpg"}
        this.playlists[4] = {id: 4, nome: "The Day Is my Enemy", musicas: [], capa: "assets/images/capas/TheDayIsMyEnemy.jpg"}
        this.playlists[5] = {id: 5, nome: "Trap-Rap", musicas: [], capa: "assets/images/capas/Trap-Rap.jpg"}
    
        this.playlists[0].musicas[0] = {id: 0, nome: "24kGoldn - Mood (feat. iann dior)", album: "Unknown", artista: "24kGoldn", duration: 132600, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/24kGoldn - Mood (feat. iann dior).mp3"}
        this.playlists[0].musicas[1] = {id: 1, nome: "BTS - Dynamite", album: "Dynamite (NightTime Version)", artista: "BTS", duration: 190200, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/BTS - Dynamite.mp3"}
        this.playlists[0].musicas[2] = {id: 2, nome: "Internet Money - Lemonade (feat. Gunna, Don Toliver & NAV)", album: "B4 The Storm", artista: "Internet Money", duration: 189600, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/Internet Money - Lemonade (feat. Gunna, Don Toliver & NAV).mp3"}
        this.playlists[0].musicas[3] = {id: 3, nome: "Justin Bieber - Holy (feat. Chance the Rapper)", album: "Holy", artista: "Justin Bieber", duration: 199200, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/Justin Bieber - Holy (feat. Chance the Rapper).mp3"}
    
        this.playlists[1].musicas[0] = {id: 0, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[1].musicas[1] = {id: 1, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[1].musicas[2] = {id: 2, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    
        this.playlists[2].musicas[0] = {id: 0, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[2].musicas[1] = {id: 1, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[2].musicas[2] = {id: 2, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    
        this.playlists[3].musicas[0] = {id: 0, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[3].musicas[1] = {id: 1, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[3].musicas[2] = {id: 2, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    
        this.playlists[4].musicas[0] = {id: 0, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[4].musicas[1] = {id: 1, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[4].musicas[2] = {id: 2, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    
        this.playlists[5].musicas[0] = {id: 0, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[5].musicas[1] = {id: 1, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
        this.playlists[5].musicas[2] = {id: 2, nome: "a", album: "a", artista: "a", duration: 1, audio: "a"}
    }
}