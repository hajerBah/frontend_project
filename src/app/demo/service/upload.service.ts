import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICE } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = URL_SERVICE +`/upload`; // Adjust URL as per your Laravel setup

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    // No need to set Content-Type, Angular handles it
    
    return this.http.post<any>(this.uploadUrl, formData);
  }
}