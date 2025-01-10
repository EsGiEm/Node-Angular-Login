
import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ErrorsService } from '../services/errors.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const userService = inject(UserService);
  const errorService = inject(ErrorsService)
 
  
  // Verificar si localStorage está disponible
  const token = typeof window !== 'undefined' ? localStorage.getItem('myToken') : null;
  
  // Calculo tiempo expiración token
  function getTokenExpiration(token: string ) {
    const decodedToken: any = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; 
    console.log(expirationTime - Date.now());
    const timeUntilExpiration = expirationTime-Date.now();
    userService.logoutByTime(timeUntilExpiration)
  }
  if (token){
  getTokenExpiration(token);}


  if (token) {
    // Clonar la solicitud para agregar el header de autorización
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    // Pasar la solicitud clonada al siguiente manejador
    return next(clonedReq).pipe(
      tap({
         next:  (event: HttpEvent<any>) => { },
         error: (error: any) => {
          if (error.status === 401) {
            localStorage.removeItem("myToken");
            errorService.messageError(error);
            //toastr.error('Your session has expired. Please log in again.');
            router.navigate(['']);}
          }
       })
    );
  }

  // Si no hay token, pasar la solicitud original
  return next(req);
};



/*
import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ErrorsService } from '../services/errors.service';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const errorService = inject(ErrorsService);

  const token = typeof window !== 'undefined' ? localStorage.getItem('myToken') : null;

  if (token) {
    // Decodificar el token para verificar la expiración
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos

      // Verificar si el token ha expirado
      if (Date.now() > expirationDate) {
        localStorage.removeItem('myToken');
        toastr.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        router.navigate(['']); // Redirige al usuario a la página de login
        return next(req); // No enviar la solicitud ya que el token es inválido
      }
    } catch (error) {
      // Si no se puede decodificar, considerar el token como inválido
      localStorage.removeItem('myToken');
      toastr.error('Token inválido. Por favor, inicia sesión nuevamente.');
      router.navigate(['']);
      return next(req);
    }

    // Clonar la solicitud para agregar el header de autorización
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedReq).pipe(
      tap({
        next: (event: HttpEvent<any>) => { },
        error: (error: any) => {
          if (error.status === 401) {
            localStorage.removeItem("myToken");
            errorService.messageError(error);
            router.navigate(['']);
          }
        }
      })
    );
  }

  // Si no hay token, pasar la solicitud original
  return next(req);
};

*/


