import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
 export class VechileService {
baseUrl= 'https://localhost:44363/api'
  constructor(private http: HttpClient) { }
  getMakes(){
    return this.http.get(this.baseUrl +'/makes');
    // map((response=>response.json()));
  }
  getFeatures(){
    return this.http.get(this.baseUrl +'/feature');
  }
}
