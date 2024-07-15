import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable , catchError, map, of, throwError} from 'rxjs';
import { Product } from '../api/product';
import { URL_SERVICE } from 'src/config/config';
import { Supplier } from '../api/supplier';


@Injectable({
    providedIn: 'root'
  })
export class SupplierService {
  

    constructor(private http: HttpClient) { }

    getSuppliersByCategory(category : string = '', page: number = 1, pageSize: number = 10): Observable<{data: Supplier[], meta: any} | null> {
        console.log(URL_SERVICE);
        
      let URL = URL_SERVICE +`/suppliers/search`;

      const token = localStorage.getItem('token');
      if (!token) {
        return of(null);
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      console.log(category);
      
      return this.http.get<{data: Supplier[], meta: any}>(`${URL}/${category}/?page=${page}&page_size=${pageSize}`,{ headers });
    }
}

