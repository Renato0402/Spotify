import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, EmailValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup
  Data: number = Date.now()

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "nome": new FormControl('', Validators.required),
      "sobrenome": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "confirmEmail": new FormControl('', [Validators.required, this.emailMatchValidation()]),
      "senha": new FormControl('', Validators.required),
      "confirmSenha": new FormControl('', Validators.required, this.senhaMatchValidation()),
      "dia": new FormControl('', Validators.required),
      "mes": new FormControl('', Validators.required),
      "ano": new FormControl('', Validators.required),
      "sexo": new FormControl('', Validators.required),
    });
  }

  submit() {
    console.log(this.form)
    this.form.reset()
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
}

/*export const exemailMatchValidation(): ValidatorFn {
  const email = this.form.get('email')
  const confirmEmail = this.form.get('confirmEmail')

  if(email.value !== confirmEmail.value){
    confirmEmail.setErrors({emailMatchValidation: true})
  }else{
    confirmEmail.setErrors(null)
  }
}

senhaMatchValidation(): ValidatorFn {
  const senha = this.form.get('senha')
  const confirmSenha = this.form.get('confirmSenha')

  if(senha.value !== confirmSenha.value){
    return{senhaMatchValidation: true})
  }else{
    confirmSenha.setErrors(null)
  }
}*/
