import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  baseUrl= 'https://localhost:44363/api'
  constructor(private http: HttpClient) { }
  getFeatures(){
    return this.http.get(this.baseUrl +'/feature');
  }
}
