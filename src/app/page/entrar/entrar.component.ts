import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup
  
  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    
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
    

    //this.usersService.addUser(user);

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

      if (control.errors && !control.errors.mustMatch) {
        return;
      }

      if (!this.usersService.checkIfUserExists(control.value)) {
        control.setErrors({ userExistsValidationError: true });
      } else {
        control.setErrors(null);
      }
    }
  }
}
