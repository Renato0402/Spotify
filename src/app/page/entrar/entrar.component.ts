import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario';
import { UsersMock } from 'src/app/mock/usersMock';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup
  Data: number = Date.now()
  mockUsers: UsersMock;


  constructor(private formBuilder: FormBuilder) {
    this.mockUsers = new UsersMock
  }

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
      validator: [this.emailMatchValidation("email", "confirmEmail"), this.senhaMatchValidation("senha", "confirmSenha"), this.userExistsValidation("email")]
    });

    /*this.form.controls.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity();
    });

    this.form.controls.senha.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity();
    });*/
  }
  /*senhaMatchValidation(arg0: string): ValidatorFn {
    throw new Error('Method not implemented.');
  }*/

  submit() {

    var user: Usuario = { nome: this.nome.value, sobrenome: this.sobrenome.value, email: this.email.value, senha: this.senha.value, dia: this.dia.value, mes: this.mes.value, ano: this.ano.value, sexo: this.sexo.value };

    this.mockUsers.addUser(user);

    this.mockUsers.addLocal();

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

  emailMatchValidation(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const controlToMatch = formGroup.controls[email];
      const control = formGroup.controls[confirmEmail];
  
      if (control.errors && !control.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
  
      if (controlToMatch.value !== control.value) {
        control.setErrors({ emailMatchValidationError: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  userExistsValidation(email: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[email];
  
      if (control.errors && !control.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
  
      if (this.mockUsers.checkIfUserExists(control.value)) {
        control.setErrors({ userExistsValidationError: true });
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
        // return if another validator has already found an error on the matchingControl
        return;
      }
      
      if (controlToMatch.value !== control.value) {
        control.setErrors({ senhaMatchValidationError: true });
      } else {
        control.setErrors(null);
      }
    }
  }
}
