import { Component, OnInit } from '@angular/core'
import { Playlist } from '../entidades/playlist'

export class PlaylistsMock {
    playlists: Playlist[]

    constructor() {
        this.playlists = []
        
        this.playlists[0] = {id: 0, nome: "As 50 mais tocadas no mundo", musicas: [], capa: "assets/images/capas/Top50Global.jpg", isPublic: true, userId: "0"}
        this.playlists[1] = { id: 1, nome: "Knife Party", musicas: [], capa: "assets/images/capas/KnifeParty.jpg", isPublic: true, userId: "0"}
        this.playlists[2] = { id: 2, nome: "As 50 mais tocadas no Brasil", musicas: [], capa: "assets/images/capas/Top50Brasil.jpg", isPublic: true, userId: "0"}
        this.playlists[3] = { id: 3, nome: "Só Track Boa 2020", musicas: [], capa: "assets/images/capas/SoTrackBoa.jpg", isPublic: true, userId: "0"}
        this.playlists[4] = { id: 4, nome: "Trap Nation", musicas: [], capa: "assets/images/capas/Trap Nation.jpg", isPublic: true, userId: "0"}
        this.playlists[5] = { id: 5, nome: "Trap-Rap", musicas: [], capa: "assets/images/capas/Trap-Rap.jpg", isPublic: true, userId: "0"}

        /*this.playlists[0].musicas[0] = { id: 0, nome: "24kGoldn - Mood (feat. iann dior)", album: "Unknown", artista: "24kGoldn", duration: 132600, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/24kGoldn - Mood (feat. iann dior).mp3" }
        this.playlists[0].musicas[1] = { id: 1, nome: "BTS - Dynamite", album: "Dynamite (NightTime Version)", artista: "BTS", duration: 190200, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/BTS - Dynamite.mp3" }
        this.playlists[0].musicas[2] = { id: 2, nome: "Internet Money - Lemonade (feat. Gunna, Don Toliver & NAV)", album: "B4 The Storm", artista: "Internet Money", duration: 189600, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/Internet Money - Lemonade (feat. Gunna, Don Toliver & NAV).mp3" }
        this.playlists[0].musicas[3] = { id: 3, nome: "Justin Bieber - Holy (feat. Chance the Rapper)", album: "Holy", artista: "Justin Bieber", duration: 199200, audio: "assets/musics/Playlists/As 50 mais tocadas no mundo/Justin Bieber - Holy (feat. Chance the Rapper).mp3" }

        this.playlists[1].musicas[0] = { id: 0, nome: "Knife Party - Bonfire", album: "Rage Valley", artista: "Knife Party", duration: 258600, audio: "/assets/musics/Playlists/Knife Party/Knife Party - Bonfire.mp3" }
        this.playlists[1].musicas[1] = { id: 1, nome: "Knife Party - Internet Friends", album: "Unknown", artista: "Knife Party", duration: 300600, audio: "assets/musics/Playlists/Knife Party/Knife Party - Internet Friends.mp3" }

        this.playlists[2].musicas[0] = { id: 0, nome: "Investe Em Mim", album: "Unknown", artista: "Jonas Esticado", duration: 184200, audio: "/assets/musics/Playlists/As 50 mais tocadas no Brasil/Jonas Esticado - Investe Em Mim.mp3" }
        this.playlists[2].musicas[1] = { id: 1, nome: "Máquina do Tempo", album: "Máquina do Tempo", artista: "Matuê", duration: 210000, audio: "/assets/musics/Playlists/As 50 mais tocadas no Brasil/Matuê - Máquina do Tempo.mp3" }

        this.playlists[3].musicas[0] = { id: 0, nome: "Party On My Own (feat. FAULHABER)", album: "Unknown", artista: "Alok, Vintage Culture feat. FAULHABER", duration: 136200, audio: "/assets/musics/Playlists/Só Track Boa 2020/Alok, Vintage Culture feat. FAULHABER - Party On My Own (feat. FAULHABER).mp3" }
        this.playlists[3].musicas[1] = { id: 1, nome: "Luis Melo - For You", album: "For You", artista: "For You", duration: 198000, audio: "/assets/musics/Playlists/Só Track Boa 2020/Luis Melo - For You.mp3" }
        this.playlists[3].musicas[2] = { id: 2, nome: "Coffee (Give Me Something)", album: "Unknown", artista: "Tiësto, Vintage Culture", duration: 186000, audio: "/assets/musics/Playlists/Só Track Boa 2020/Tiësto, Vintage Culture - Coffee (Give Me Something).mp3" }

        this.playlists[4].musicas[0] = { id: 0, nome: "Fabian Mazur & Snavs - Arena [Trap]", album: "Arena", artista: "Fabian Mazur & Snavs", duration: 195600, audio: "assets/musics/Playlists/Trap Nation/Fabian Mazur & Snavs - Arena [Trap].mp3" }
        this.playlists[4].musicas[1] = { id: 1, nome: "INZO - Angst", album: "Unknown", artista: "INZO", duration: 193200, audio: "assets/musics/Playlists/Trap Nation/INZO - Angst.mp3" }
        this.playlists[4].musicas[2] = { id: 2, nome: "INZO - Overthinker", album: "Overthinker", artista: "INZO", duration: 256800, audio: "assets/musics/Playlists/Trap Nation/INZO - Overthinker.mp3" }
        this.playlists[4].musicas[3] = { id: 3, nome: "Kloud - HUMANS (Far Out Remix)", album: "Unknown", artista: "Kloud", duration: 267200, audio: "assets/musics/Playlists/Trap Nation/Kloud - HUMANS (Far Out Remix).mp3" }

        this.playlists[5].musicas[0] = { id: 0, nome: "Motorcycle Patches", album: "HUNCHO JACK", artista: "Travis Scott ft. Quavo", duration: 186600, audio: "/assets/musics/Playlists/Trap-Rap/HUNCHO JACK - Motorcycle Patches.mp3" }
        this.playlists[5].musicas[1] = { id: 1, nome: "Eye 2 Eye", album: "HUNCHO JACK", artista: "Travis Scott ft. Quavo, Takeoff", duration: 187200, audio: "/assets/musics/Playlists/Trap-Rap/HUNCHO JACK, Travis Scott, Quavo feat. Takeoff - Eye 2 Eye.mp3" }
        this.playlists[5].musicas[2] = { id: 2, nome: "goosebumps", album: "birds in the trap sing mcknight", artista: "Travis Scott", duration: 242400, audio: "/assets/musics/Playlists/Trap-Rap/Travis Scott - goosebumps.mp3" }
        this.playlists[5].musicas[3] = { id: 3, nome: "SICKO MODE", album: "Astroworld", artista: "Travis Scott", duration: 307800, audio: "/assets/musics/Playlists/Trap-Rap/Travis Scott - SICKO MODE.mp3" }*/
    }
}