import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductListingService {

  apiUrl = 'http://localhost:5240/api/' 

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }


  GetProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}Store/ProductListing`)
      .pipe(map(result => result));
  }
  
  sortProductsByField(field: string, order: string): Observable<any> {
    const url = `${this.apiUrl}?sort=${field}&order=${order}`;
    return this.httpClient.get<any>(url);
  }

  filterProductsByKeyword(keyword: string): Observable<any> {
    const url = `${this.apiUrl}?filter=${keyword}`;
    return this.httpClient.get<any>(url);
  }
  // addProduct(product: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.apiUrl}Store/AddProduct`, product);
  // }
  

  addProduct(product: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}Store/addProducts`, product);
  }

  getBrands(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}Store/GetBrands`);
  }

  getProductTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}Store/GetProductTypes`);
  }

  getProductsByBrands(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}Report/products-by-brands`);
  }

  getProductsByTypes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}Report/products-by-types`);
  }

  getproductTypes(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(`${this.apiUrl}/GetProductTypes`);
  }
  
  getActiveProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}Report/GetActiveProducts`);
  }

}

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface ProductType {
  productTypeId: number;
  name: string;
  description: string;
  products: Product[];
}