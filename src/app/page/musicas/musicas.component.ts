import { Component, OnInit } from '@angular/core';
import { PlaylistClicadaService } from 'src/app/services/playlist-clicada.service';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  service: PlaylistClicadaService
  a: HTMLCollection
  
  constructor(service: PlaylistClicadaService) {
    this.service = service
    this.a = document.getElementsByClassName("a")
  }

  ngOnInit(): void {
    this.a[0].textContent = String(this.service.index)
  }

}
