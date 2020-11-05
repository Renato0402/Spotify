import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthInterceptor } from 'src/app/httpInterceptor/authInterceptor';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup
  isLogged

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private authInterceptor: AuthInterceptor, private authService: AuthService, private tokenService: TokenService) {
    this.isLogged = false
  }

  ngOnInit(): void {
    if(this.tokenService.getToken){
      this.isLogged = true
    }

    this.form = this.formBuilder.group({
      "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "senha": new FormControl('', Validators.required)
    }, {
      validator: [this.userExistsValidation("email"), this.passwordIsCorrect("email", "senha")]
    });
  }

  submit() {

    this.authService.login(this.email.value, this.senha.value).subscribe(data => {
      this.tokenService.saveToken(data.accessToken)
      this.tokenService.saveUser(data)

      this.isLogged = true

      console.log(data)
      this.form.reset()
    })

    //this.usersService.login(this.email.value, this.senha.value)
  }

  get email() {
    return this.form.get('email')
  }

  get senha() {
    return this.form.get('senha')
  }

  userExistsValidation(email: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[email];
      let exists = false

      this.usersService.getUserByEmail(control.value).subscribe((usuario: Usuario[]) => {
        if (usuario.length > 0) {
          exists = true
        }

        if (control.errors && !control.errors.mustMatch) {
          return;
        }

        if (!exists) {
          control.setErrors({ userExistsValidationError: true });
        } else {
          control.setErrors(null);
        }
      })
    }
  }

  passwordIsCorrect(email: string, senha: string) {
    return (formGroup: FormGroup) => {
      const controlEmail = formGroup.controls[email];
      const controlSenha = formGroup.controls[senha];
      let isCorrect = false

      this.usersService.checkPassword(controlEmail.value, controlSenha.value).subscribe((usuario: Usuario[]) => {
        if (usuario.length > 0) {
          isCorrect = true
        }

        if (controlEmail.errors && !controlEmail.errors.mustMatch) {
          return;
        }

        if (controlSenha.errors && !controlSenha.errors.mustMatch) {
          return;
        }

        if (!isCorrect) {
          controlSenha.setErrors({ incorrectPasswordValidationError: true });
        } else {
          controlSenha.setErrors(null);
        }
      })
    }
  }

  isUserLogged() {
    if (localStorage.getItem('user')) {
      return true;
    }
  }
}
