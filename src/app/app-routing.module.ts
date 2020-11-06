import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { AjudaComponent } from './page/ajuda/ajuda.component';
import { EntrarComponent } from './page/entrar/entrar.component';
import { PlaylistsComponent } from './page/playlists/playlists.component';
import { MusicasComponent } from './page/musicas/musicas.component';
import { CadastroComponent } from './page/cadastro/cadastro.component';
import { UserProfileComponent } from './page/user-profile/user-profile.component';

const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: 'home'},
  {path: "home", component: HomeComponent},
  {path: "entrar", component: EntrarComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "userProfile", component: UserProfileComponent},
  {path: "playlists", component: PlaylistsComponent},
  {path: "musicas/:id", component: MusicasComponent},
  {path: "ajuda", component: AjudaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
