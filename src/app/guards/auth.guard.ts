import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const token: string | unknown = inject(TokenService).getToken();
  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
}
