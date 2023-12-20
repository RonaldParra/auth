import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'PointBack Login'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Olvido su contraseña'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro PointBack'
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
    title: 'Recuperar Contraseña area PointBack '
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
