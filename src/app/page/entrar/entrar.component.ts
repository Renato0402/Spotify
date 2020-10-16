import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "nome": new FormControl('', Validators.required),
      "sobrenome": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "confirmEmail": new FormControl('', [Validators.required, Validators.email, emailValidator]),
      "senha": new FormControl('', Validators.required),
      "confirmSenha": new FormControl('', Validators.required, senhaValidator),
    });
  }

  submit() {

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

}

export const emailValidator: AsyncValidatorFn = (control: FormGroup): Promise<ValidationErrors | null> => {
  const email = control.get("email")
  const confirmEmail = control.get("confirmEmail")

  return email && confirmEmail && email.value == confirmEmail.value ?
    new Promise(() => { emailConfirmation: true }) :
    new Promise(() => { emailConfirmation: false })
}

export const senhaValidator: AsyncValidatorFn = (control: FormGroup): Promise<ValidationErrors | null> => {
  const senha = control.get("email")
  const confirmSenha = control.get("confirmEmail")

  return senha && confirmSenha && senha.value === confirmSenha.value ?
    new Promise(() => { senhaConfirmation: true }) :
    new Promise(() => { senhaConfirmation: false })
}
