import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  savenToken(token: string){
    // localStorage.setItem('token', token);
    setCookie('token-pointback', token, {expires: 365, parth:'/'});
  }

  getToken(){
    // const token = localStorage.getItem('token');
    const token = getCookie('token-pointback');
    return token;
  }

  removeToken(){
    removeCookie('token-pointback')
  }



}
