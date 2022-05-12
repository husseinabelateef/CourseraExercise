import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../Models/Category';
import { ProductModel } from '../Models/ProductModel';
import { CategoryProductViewModel } from '../ViewModel/categoryProductViewModel';
import { ProductFiltered } from '../ViewModel/ProductFiltered';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private httpOptions;
    constructor(private httpClient: HttpClient) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
          // , Authorization': 'Token'
        })
      }
    }
    getAllCategories(): Observable<Category[]>
    {
      return this.httpClient.get<Category[]>(`${environment.APIBaseURL}/api/Category`)
    }
    getAllProducts(): Observable<ProductModel[]> {
      return this.httpClient.get<ProductModel[]>(`${environment.APIBaseURL}/api/Product`)
    }
    deleteProduct(prdID: number): Observable<ProductModel> {
      return this.httpClient.delete<ProductModel>(`${environment.APIBaseURL}/api/Product/${prdID}`)
    }
    getProductByID(prdID: number): Observable<ProductModel> {
      return this.httpClient.get<ProductModel>(`${environment.APIBaseURL}/api/Product/${prdID}`);
    }
    getProductsByCatID(catID: number): Observable<ProductModel[]> {
      return this.httpClient.get<ProductModel[]>(`${environment.APIBaseURL}/api/Product?cateogry=${catID}`);
    }
    getFilteredProduct(product: ProductFiltered): Observable<ProductModel[]> {
      return this.httpClient.get<ProductModel[]>(`${environment.APIBaseURL}/api/Product/filter?page=${product.page}&size=${product.size}&order=${product.order}&filter=${product.filter}&id=${product.id}`);
    }
    getCategoryProduct():Observable<CategoryProductViewModel[]>{
      return this.httpClient.get<CategoryProductViewModel[]>(`${environment.APIBaseURL}/api/Category/catProduct`);
    }
  }
