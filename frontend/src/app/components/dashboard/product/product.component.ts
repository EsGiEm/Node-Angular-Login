import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/products';
import { NgFor } from '@angular/common';

@Component({
  selector: 'dashboard-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  

  constructor(private productService: ProductService){}

ngOnInit(): void {
  this.getProduct();
  }

  products: Product[] = [];
    

    getProduct(): void {
      this.productService.getProducts().subscribe({
        next: (data: Product[]) => {
          this.products = data; // Asignar la lista de productos al array
        },
        error: (error) => {
          console.error('Error al obtener los productos', error);
        },
        complete: () => {
          console.log('Productos cargados correctamente.');
        }
      });
    }

}
