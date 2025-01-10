import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private http = inject(HttpClient) // No se puede inyectar en el constructor directamente como se hace con otros servicios
  private AppUrl: string;
  private APIUrlProd: string;
  constructor() {
    this.AppUrl = environment.apiUrl;  // Comunicación del servidor Nodejs' http://localhost:3017/'
    this.APIUrlProd = '/api/product/getProducts'; // Ruta de registro una vez dentro de Nodejs

  }

  // Trae directamente toda la lista de productos por eso no se crea objeto y se utiliza array
  getProducts(): Observable<Product[]> {
   // cuando se hace la solicitud el token.interceptor.ts actúa globalmente para todas las solicitudes http
    return this.http.get<Product[]>(`${this.AppUrl}${this.APIUrlProd}`)
  }


}


