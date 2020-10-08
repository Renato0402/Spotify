import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjudaComponent } from './page/ajuda/ajuda.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { HomeComponent } from './page/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { PlaylistsComponent } from './page/playlists/playlists.component';
import { EntrarComponent } from './page/entrar/entrar.component';
import { MusicasComponent } from './page/musicas/musicas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AjudaComponent,
    HomeComponent,
    FooterComponent,
    PlaylistsComponent,
    EntrarComponent,
    MusicasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
