import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup
  isLogged

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.isLogged = false
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "senha": new FormControl('', Validators.required)
    }, {
      validator: [this.userExistsValidation("email"), this.passwordIsCorrect("email", "senha")]
    });
  }

  submit() {
    this.usersService.login(this.email.value, this.senha.value)
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
}
