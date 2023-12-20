import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model'


@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      // TODO: Connect
      this.authService.recovery(email)
      .subscribe({
        // si es correcta la respuesta ejecutamos next
        next: () => {
          this.status = 'success';
          this.emailSent = true;
          // this.router.navigate(['/home'])
        },
        // sino es correcta la respuesta ejecutamos error
        error: () => {
          this.status = 'failed';
        }
      });
    } else {
      // dddddd
    }
  }

}
