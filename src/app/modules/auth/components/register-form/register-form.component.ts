import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model'
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formUserExist = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  });
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    documento: ['', [Validators.minLength(8), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusUserExist: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      // console.log(name, email, password);
      this.authService.registerAndLogin(name, email, password)
      .subscribe({
        // si es correcta la respuesta ejecutamos next
        next: () => {
          this.status = 'success';
          this.router.navigate(['/home/pointback'])
        },
        // sino es correcta la respuesta ejecutamos error
        error: (error) => {
          this.status = 'failed';
          console.log(error)
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    if (this.formUserExist.valid){
      this.statusUserExist = 'loading';
      const { email } = this.formUserExist.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusUserExist = 'success';
          console.log(rta)
          if (rta.isAvailable){
            this.showRegister = true;
            this.form.controls.email.setValue(email);
          } else {
            this.router.navigate(['/login'], {
              queryParams: { email }
            });
          }
        },
        error: (error) => {
          this.statusUserExist = 'failed';
          console.log(error)
        }
      })
    } else {
      this.formUserExist.markAllAsTouched();
    }
  }
}
