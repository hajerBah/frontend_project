import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable , catchError, map, of, throwError} from 'rxjs';
import { Product } from '../api/product';
import { URL_SERVICE } from 'src/config/config';


@Injectable({
    providedIn: 'root'
  })
export class ProductService {
  

    constructor(private http: HttpClient) { }

    getProducts(page: number = 1, pageSize: number = 10): Observable<{data: Product[], meta: any} | null> {
      let URL = URL_SERVICE + '/products';

      const token = localStorage.getItem('token');
      if (!token) {
        return of(null);
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<{data: Product[], meta: any}>(`${URL}?page=${page}&page_size=${pageSize}`,{ headers });
    }

    create(data:any):Observable<any>{
      let URL = URL_SERVICE + '/products';
  
      const token = localStorage.getItem('token');
  
      if(!token)
      {
        return of(null);
      }
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,}
      );
  
      return this.http.post<any>(URL, data, {headers});
        
    }


    delete(id: string): Observable<any> {
      const URL = `${URL_SERVICE}/products/${id}`;
      const token = localStorage.getItem('token');
    
      if (!token) {
        return throwError('Token missing or expired');
      }
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this.http.delete<any>(URL, { headers: headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle unauthorized error (token expired or invalid)
            // Example: redirect to login page or refresh token
            console.error('Unauthorized request:', error.message);
          }
          return throwError(error);
        })
      );
    }

    restore(id: string): Observable<any> {
      const URL = `${URL_SERVICE}/products/${id}`;
      const token = localStorage.getItem('token');
    
      if (!token) {
        return throwError('Token missing or expired');
      }
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this.http.patch<any>(URL, {}, { headers: headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle unauthorized error (token expired or invalid)
            // Example: redirect to login page or refresh token
            console.error('Unauthorized request:', error.message);
          }
          return throwError(error);
        })
      );
    }

    getProduct(id: string): Observable<Product | null> {
      const URL = `${URL_SERVICE}/products/${id}`;
      const token = localStorage.getItem('token');
  
      if (!token) {
        return of(null); // Return null if token is missing
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<Product>(URL, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching product:', error);
          return of(null); // Return null if an error occurs
        })
      );
    }

   
  updateProduct(id: string, data: any): Observable<any> {
    const URL = `${URL_SERVICE}/products/${id}`;
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError('Token missing or expired');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(URL, data, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle unauthorized error (token expired or invalid)
            console.error('Unauthorized request:', error.message);
          }
          return throwError(error);
        })
      );
  }
}

