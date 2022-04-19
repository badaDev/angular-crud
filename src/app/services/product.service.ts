import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: []

  constructor() { }

  addProduct(productData: ProductModel) {
    let products = []
    if (localStorage.getItem('Product')) {
      products = JSON.parse(localStorage.getItem('Product'));
      products = [productData, ...products];
    } else {
      products = [productData];
    }
    localStorage.setItem('Product', JSON.stringify(products));  
  }


  getProduct() {
    this.productList = JSON.parse(localStorage.getItem('Product'))
    console.log(this.productList);
    return this.productList;
    

    // this.prodService.getProduct;
    // productList = localStorage.getItem('Product');
    // if (productList != null || productList != undefined) {
    //     return productList
    // } else {
    //   return "Error"
    // }
    // console.log(this.productList);
    // console.log(localStorage.getItem('Product'));
  }

}
