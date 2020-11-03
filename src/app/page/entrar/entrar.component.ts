import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthInterceptor } from 'src/app/httpInterceptor/authInterceptor';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private authInterceptor: AuthInterceptor, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "senha": new FormControl('', Validators.required)
    }, {
      validator: [this.userExistsValidation("email")]
    });
  }

  submit() {

    this.authService.login(this.email.value, this.senha.value)

    this.form.reset()
      
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

  isUserLogged() {
    if (localStorage.getItem('user')) {
      return true;
    }
  }
}
