import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient) // No se puede inyectar en el constructor directamente como se hace con otros servicios
  private AppUrl : string;
  private APIUrlReg : string;
  private APIUrlLog : string;
  private timeOutID : any;
  constructor(private router: Router, private toastr: ToastrService ) { 
    this.AppUrl = environment.apiUrl;  // Comunicación del servidor Nodejs' http://localhost:3017/'
    this.APIUrlReg = '/api/user/register'; // Ruta de registro una vez dentro de Nodejs
    this.APIUrlLog = '/api/user/login';
    this.timeOutID;
  }

  // Any losdatos pueden ser de cualquier tipo
  signIn(user: User): Observable<any>{
    return this.http.post( `${this.AppUrl}${this.APIUrlReg}`,user)
  }

  // Sabemos que va a traer un string
  logIn(user: User): Observable<string>{
    return this.http.post<string>( `${this.AppUrl}${this.APIUrlLog}`,user)
  }



  logoutByButton() {
    clearTimeout(this.timeOutID)
    localStorage.removeItem("myToken")
    this.router.navigate(['']); // Redirige al usuario a la página de login
    this.toastr.info('Sesión cerrada correctamente', 'Info');
  }

  logoutByTime(timeUntilExpiration:any){
    if (timeUntilExpiration > 0) {
          this.timeOutID = setTimeout(() => {
          if(localStorage.getItem("myToken")){
          localStorage.removeItem("myToken");
          this.router.navigate([""]);
          this.toastr.info('Su sesión ha caducado', 'Info')}
      }, timeUntilExpiration);
    }
  }
   
   
    
    }
  
  

