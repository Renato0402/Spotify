import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from 'src/app/entidades/playlist';
import { Usuario } from 'src/app/entidades/usuario';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup
  user: Usuario
  Data: number = Date.now()
  userPlaylists: Playlist[]

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private playlistsService: PlaylistsService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "nome": new FormControl('', Validators.required),
      "sobrenome": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "confirmEmail": new FormControl('', Validators.required),
      "senha": new FormControl('', Validators.required),
      "confirmSenha": new FormControl('', Validators.required),
      "dia": new FormControl('', Validators.required),
      "mes": new FormControl('', Validators.required),
      "ano": new FormControl('', Validators.required),
      "sexo": new FormControl('', Validators.required),
    }, {
      validator: [this.emailMatchValidation("email", "confirmEmail"), this.senhaMatchValidation("senha", "confirmSenha")]
    });

    this.user = this.usersService.getLocalUser()

    this.fillForm()

    document.getElementById("username").textContent = this.nome.value + " " + this.sobrenome.value

    this.playlistsService.getPlaylistsFromUser(this.user.id).subscribe((playlists: Playlist[]) =>{
        this.userPlaylists = playlists
    })
  }

  submit() {
    let updatedUser:Usuario = { id: this.user.id, nome: this.nome.value, sobrenome: this.sobrenome.value, email: this.email.value, senha: this.senha.value, dia: this.dia.value, mes: this.mes.value, ano: this.ano.value, sexo: this.sexo.value }
    
    this.usersService.updateUser(updatedUser).subscribe()

    document.getElementById("username").textContent = this.nome.value + " " + this.sobrenome.value
  }

  get nome() {
    return this.form.get('nome')
  }

  get sobrenome() {
    return this.form.get('sobrenome')
  }

  get email() {
    return this.form.get('email')
  }

  get confirmEmail() {
    return this.form.get('confirmEmail')
  }

  get senha() {
    return this.form.get('senha')
  }

  get confirmSenha() {
    return this.form.get('confirmSenha')
  }

  get dia() {
    return this.form.get('dia')
  }

  get mes() {
    return this.form.get('mes')
  }

  get ano() {
    return this.form.get('ano')
  }

  get sexo() {
    return this.form.get('sexo')
  }

  emailMatchValidation(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const controlToMatch = formGroup.controls[email];
      const control = formGroup.controls[confirmEmail];

      if (control.errors && !control.errors.mustMatch) {
        return;
      }

      if (controlToMatch.value !== control.value) {
        control.setErrors({ emailMatchValidationError: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  senhaMatchValidation(senha: string, confirmSenha: string) {
    return (formGroup: FormGroup) => {
      const controlToMatch = formGroup.controls[senha];
      const control = formGroup.controls[confirmSenha];

      if (control.errors && !control.errors.mustMatch) {
        return;
      }

      if (controlToMatch.value !== control.value) {
        control.setErrors({ senhaMatchValidationError: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  logout(){
    this.usersService.logout()
  }

  fillForm(){
    this.nome.setValue(this.user.nome)
    this.sobrenome.setValue(this.user.sobrenome)
    this.email.setValue(this.user.email)
    this.senha.setValue(this.user.senha)
    this.dia.setValue(this.user.dia)
    this.mes.setValue(this.user.mes)
    this.ano.setValue(this.user.ano)
    this.sexo.setValue(this.user.sexo)
  }
}


