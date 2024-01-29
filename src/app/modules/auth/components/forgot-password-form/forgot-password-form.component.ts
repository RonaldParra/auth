import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model'


@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  formUserExist = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    documento: ['', [Validators.min(100000), Validators.max(9999999999), Validators.required]]
  });
  status: RequestStatus = 'init';
  statusUserExist: RequestStatus = 'init';
  tipo: string = '1';
  tokenAdmin = '';
  emailSent = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  
  sendLink(email: string) {
    this.status = 'loading';
    // const { email } = this.form.getRawValue();
    // primero verifico que email existe
    // pido email y cedula y verifico que existe
    // si existe mmando correo de cambio de contraseña

    this.authService.recovery(email)
    .subscribe({
      // si es correcta la respuesta ejecutamos next
      next: (resp) => {
        console.log('sendLink next exitodos')
        console.log(resp)
        this.status = 'success';
        this.emailSent = true;
        // this.router.navigate(['/home'])
      },
      // sino es correcta la respuesta ejecutamos error
      error: (err) => {
        console.log('error no se pudo conectar')
        console.log(email)
        console.log(err)
        this.status = 'failed';
      }
    });
    
  }


  validateUserAfterLog(token: string, email: string, documento: string){
    console.log('llame a funcion validateUserAfterLog')
    this.statusUserExist = 'loading';
    this.authService.isAvailable(token, email, this.tipo, documento)
    .subscribe({
      // si OBTENEMOS ALGUNA RESPUESTA ejecutamos next
      next: (rta) => {
        console.log('SE PUDO VERIFICAR SI ESTE REGISTRO YA EXISTE O NO EXISTE')
        this.statusUserExist = 'success';
        console.log(rta)
        console.log(rta.data.exist_customer)

        if (rta.data.exist_customer == 1){
          this.sendLink(email)
          console.log('llamo a enviar email')
          // this.showMessageSuccess = true;

          // this.form.controls.email.setValue(email);
          //this.form.controls.tipo.setValue(tipo);
          // this.form.controls.documento.setValue(documento);
        } else {
          console.log('este usuario no existe no puede cambiar clave')
          /*
          this.router.navigate(['/login'], {
            queryParams: { email }
          });
          */
        }
        
        
      },
      error: (error) => {
        this.statusUserExist = 'failed';
        console.log('errorr en la respusta de la api validateUserAfterLog:');
        console.log(error)
      }
    })
    
    
  }


  doLoginadmin(){
    console.log('llamo a funcion y entro doLoginadmin')
    // conecto a api de login - envio datos de admin
        // obtengo respuesta - si es positiva 
    // conecto a api de validar usuario
        // obtengo respuesta - si es positiva muestro form de registro
    
    if (this.formUserExist.valid) {
      this.status = 'loading';
      const { email } = this.formUserExist.getRawValue();
      //const { tipo } = this.formUserExist.getRawValue();
      const { documento } = this.formUserExist.getRawValue();
      // valores email y password deben ser ocultossssss
      // valores email y password deben ser ocultossssss
      // valores email y password deben ser ocultossssss
      const xemail = 'webysistemas@gmail.com'
      const password = '929e7@2C8Kq'
      this.authService.loginAdmin(xemail, password)
      .subscribe({
        // si OBTENEMOS ALGUNA RESPUESTA ejecutamos next
        next: (resp) => {
          console.log('el admin se pudo loguear')
          console.log(resp.data.token)
          this.tokenAdmin = resp.data.token
          this.status = 'success';
          // this.router.navigate(['/home'])
          this.validateUserAfterLog(resp.data.token, email, documento)
        },
        // sino es correcta la respuesta ejecutamos error
        error: (error) => {
          console.log('errorr en la respusta de la api:');
          console.log(error);
          this.status = 'failed';
        }
      });
    } else {
      this.formUserExist.markAllAsTouched();
      console.log('entro en sino de fomr no valido')
    }
  }

}
