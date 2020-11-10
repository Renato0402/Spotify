import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { UsersService } from 'src/app/services/users.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  form: FormGroup
  Data: number = Date.now()

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {
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
  }

  submit() {
    var user: Usuario = { id: uuidv4(), nome: this.nome.value, sobrenome: this.sobrenome.value, email: this.email.value, senha: this.senha.value, dia: this.dia.value, mes: this.mes.value, ano: this.ano.value, sexo: this.sexo.value, playlists: [] };

    this.usersService.addUser(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/entrar']);
    })
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

  userExistsValidation(email: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[email];
      let exists = false

      this.usersService.getUserByEmail(control.value).subscribe((usuario: Usuario[]) => {
        
        if(usuario.length > 0){
          exists = true
        }

        if (control.errors && !control.errors.mustMatch) {
          return;
        }
  
        if (exists) {
          control.setErrors({ userExistsValidationError: true });
        } else {
          control.setErrors(null);
        }
      })
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
}
