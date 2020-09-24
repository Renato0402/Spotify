import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  Data: number = Date.now()

  constructor() {}

  ngOnInit(): void {
    //let date = new Date(Date.now());

    //document.getElementById("data").textContent = date.toLocaleDateString('PT-BR')
  }
}
