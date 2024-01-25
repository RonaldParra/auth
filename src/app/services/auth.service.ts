import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from '@services/token.service';
import { ResponseLogin  } from '@models/auth.model';
import { User } from '@models/user.model';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL
  apiKey = environment.API_KEY
  

  // const headers = { 'Api-Key:': '202b6fa62848095696b467059086e4a059f514a951a021fb796059a27c69a9f6ca16', 'Route:':'login','Content-Type': 'application/json' };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  loginAdmin(x: string, p: string){
    // valores email y password deben ser ocultossssss
    // valores email y password deben ser ocultossssss
    // valores email y password deben ser ocultossssss
    const xemail = 'webysistemas@gmail.com'
    const xpassword = '929e7@2C8Kq'
    let headers = new HttpHeaders({
      'Api-Key': this.apiKey,
      'Route': 'login'
      });
    let options = { headers: headers };
    // let options = new RequestOptions({headers:headerx});
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api_point_back.php`,{
      xemail,
      xpassword
    }, options)
    .pipe(
      tap(response => {
        switchMap(() => this.isAvailable(response.data.token, x, p))
      })
    );
    /*
    .pipe(
      switchMap(() => this.registerAndLogin(name, lastname, tipo, documento, email, password))
    );
    */
  }

    login(email: string, pwd: string){
      /*let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Api-Key','202b6fa62848095696b467059086e4a059f514a951a021fb796059a27c69a9f6ca16');
      headers.append('Route','login');*/
      let headers = new HttpHeaders({
        'Api-Key': this.apiKey,
        'Route': 'login'
        });
      let options = { headers: headers };
      // let options = new RequestOptions({headers:headerx});
      return this.http.post<ResponseLogin>(`${this.apiUrl}/api_point_back.php`,{
        email,
        pwd
      }, options)
      .pipe(
        tap(response => {
          this.tokenService.savenToken(response.data.token);
        })
      );
    }

    register(name: string, lastname: string, tipo: string, documento: string, email: string, password: string){
      return this.http.post(`${this.apiUrl}/api/v1/auth/register`,{
        name,
        email,
        password
      })
    }
  
    registerAndLogin(name: string, lastname: string, tipo: string, documento: string, email: string, password: string){
      return this.register(name, lastname, tipo, documento, email, password)
      .pipe(
        switchMap(() => this.login(email, password))
      );
    }

    isAvailable(token: string, x: string, p: string){
      let headers = new HttpHeaders({
        'Api-Key': this.apiKey,
        'Route': 'get_customer_email_and_document_point_back',
        'Authorization': token
      });
      let options = { headers: headers };
      return this.http.post<{isAvailable: number}>(`${this.apiUrl}/api_point_back.php`,{
        x,
        p
      }, options)
    }

    /*
     isAvailable(email: string, documento: string){
      return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`,{
        email,
        documento
      })
    }
    */

    recovery(email: string){
      return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/recovery`,{
        email
      })
    }

    changePassword(token: string, newPassword: string){
      return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/change-password`,{
        token,
        newPassword
      })
    }

    getProfile(){
      const token = this.tokenService.getToken();
      return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    }

    logout(){
      this.tokenService.removeToken();
    }



}
