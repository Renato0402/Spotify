import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjudaComponent } from './page/ajuda/ajuda.component';
import { HomeComponent } from './page/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { PlaylistsComponent } from './page/playlists/playlists.component';
import { EntrarComponent } from './page/entrar/entrar.component';
import { MusicasComponent } from './page/musicas/musicas.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './page/cadastro/cadastro.component';
import { UserProfileComponent } from './page/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AjudaComponent,
    HomeComponent,
    FooterComponent,
    PlaylistsComponent,
    EntrarComponent,
    MusicasComponent,
    CadastroComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
