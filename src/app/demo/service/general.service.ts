import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders} from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { URL_SERVICE } from 'src/config/config';
import { Category } from '../api/category';
import { Color } from '../api/color';


@Injectable({
    providedIn: 'root'
  })
export class GeneralService {

  
    private baseUrlCategories =  URL_SERVICE + '/getCategories';
    private baseUrlColors =  URL_SERVICE + '/getColors';

    constructor(private http: HttpClient) { }

    getCatgories(): Observable<{data: Category[]} | null> {
      const token = localStorage.getItem('token');
      if (!token) {
        return of(null);
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

  
      return this.http.get<{data: Category[]}>(`${this.baseUrlCategories}`,{ headers });
    }


    getColors(): Observable<{data: Color[]} | null> {
      const token = localStorage.getItem('token');
      if (!token) {
        return of(null);
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

  
      return this.http.get<{data: Color[]}>(`${this.baseUrlColors}`,{ headers });
    }
}
