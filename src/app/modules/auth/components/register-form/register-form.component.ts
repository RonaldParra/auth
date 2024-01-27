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
    email: ['', [Validators.email, Validators.required]],
    tipo: ['', [Validators.required]],
    documento: ['', [Validators.min(100000), Validators.max(9999999999), Validators.required]]
  });
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['', [Validators.min(100000), Validators.max(9999999999), Validators.required]],
    tipo: [{ value: '', disabled: true }, [Validators.required]],
    documento: [{ value: '', disabled: true }, []],
    email: [{ value: '', disabled: true }, []],
    password: ['', [Validators.minLength(6), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  statusAdminLogin: RequestStatus = 'init';
  status: RequestStatus = 'init';
  statusUserExist: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;
  tokenAdmin = '';
  xxx: string = 'hidden';
  txtMessage: string = ''
  xxxError: string = 'hidden';
  txtErrorMessage: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  validateUserAfterLog(token: string, email: string, tipo: string, documento: string){
    console.log('llame a funcion validateUserAfterLog')
    this.statusUserExist = 'loading';
    this.authService.isAvailable(token, email, tipo, documento)
    .subscribe({
      // si OBTENEMOS ALGUNA RESPUESTA ejecutamos next
      next: (rta) => {
        console.log('SE PUDO VERIFICAR SI ESTE REGISTRO YA EXISTE O NO EXISTE')
        this.statusUserExist = 'success';
        console.log(rta)
        console.log(rta.data.exist_customer)

        if (rta.data.exist_customer == 0){
          this.showRegister = true;
          this.form.controls.email.setValue(email);
          this.form.controls.tipo.setValue(tipo);
          this.form.controls.documento.setValue(documento);
        } else {
          this.router.navigate(['/login'], {
            queryParams: { email }
          });
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
      this.statusAdminLogin = 'loading';
      const { email } = this.formUserExist.getRawValue();
      const { tipo } = this.formUserExist.getRawValue();
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
          this.statusAdminLogin = 'success';
          // this.router.navigate(['/home'])
          this.validateUserAfterLog(resp.data.token, email, tipo, documento)
        },
        // sino es correcta la respuesta ejecutamos error
        error: (error) => {
          console.log('errorr en la respusta de la api:');
          console.log(error);
          this.statusAdminLogin = 'failed';
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log('entro en sino de fomr no valido')
    }
  }

  /*
  doLoginAdmin() { 
    if (this.form.valid) {
      this.status = 'loading';
      // valores email y password deben ser ocultossssss
      // valores email y password deben ser ocultossssss
      // valores email y password deben ser ocultossssss
      const  email = 'webysistemas@gmail.com'
      const  password = '929e7@2C8Kq'
      this.authService.loginAdmin(email, password)
      .subscribe({
        // si es correcta la respuesta ejecutamos next
        next: () => {
          console.log('el admin se pudo loguear')
          console.log()
          this.status = 'success';
          this.router.navigate(['/home'])
        },
        // sino es correcta la respuesta ejecutamos error
        error: (error) => {
          console.log('errorrrrrr:');
          console.log(error);
          this.status = 'failed';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  */

  doRegister() {
    if (this.form.valid) {
      this.status = 'loading';
      console.log('this.tokenAdmin:  ')
      console.log(this.tokenAdmin)
      const { name, lastname, phone, tipo, documento, email, password } = this.form.getRawValue();
      console.log('email y cedula:  ')
      console.log(email + ' - ' +  documento)
      // console.log(name, email, password);
      this.authService.register(name, lastname, phone, tipo, documento, email, password, this.tokenAdmin)
      .subscribe({
        // si se conecta y obtiene una respuesta ejecutamos next
        next: (resp) => {
          if (resp.transaction_status.code === 200){
            console.log('usuario registrado exitosamente')
            this.status = 'success';
            this.txtMessage = 'Exito! Ya puedes empezar a sumar tus Puntos!!!'
            this.xxx = 'block center bg-green-100 px-6 py-6 mb-6 text-base'          
            // this.router.navigate(['/home/pointback'])
          } else {
            this.status = 'failed';
            this.txtErrorMessage = 'Hubo un inconveniente, por favor intentalo de nuevo.'
            this.xxxError = 'block center bg-red-200 px-6 py-6 mb-6 text-base'
          }          
        },
        // sino hubo un problema para conectar con la api
        error: (error) => {
          this.status = 'failed';
          console.log('error en funcion register')
          console.log(error)
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  

  /*
  validateUser(){
    if (this.formUserExist.valid){
      this.statusUserExist = 'loading';
      const { email } = this.formUserExist.getRawValue();
      // const { tipodoc } = this.formUserExist.getRawValue();
      const { documento } = this.formUserExist.getRawValue();
      this.authService.isAvailable(email, documento)
      .subscribe({
          next: (rta) => {
            this.statusUserExist = 'success';
            console.log(rta)
            if (rta.isAvailable){
              this.showRegister = true;
              this.form.controls.email.setValue(email);
              this.form.controls.documento.setValue(documento);
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
  */

  /*
  validateUser(){
    if (this.formUserExist.valid){
      this.statusUserExist = 'loading';
      const { email } = this.formUserExist.getRawValue();
      const { documento } = this.formUserExist.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusUserExist = 'success';
          console.log(rta)
          if (rta.isAvailable){
            this.showRegister = true;
            this.form.controls.email.setValue(email);
            this.form.controls.documento.setValue(documento);
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
  */
}
