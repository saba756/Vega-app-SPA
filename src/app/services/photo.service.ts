import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl= 'https://localhost:44363/api/vehicles'
  constructor(private http: HttpClient) { }
  upload(vehicleId, photo){
    var formData = new FormData();
    formData.append('file', photo);
     return  this.http.post(`https://localhost:44363/api/vehicles/${vehicleId}/photos`, formData);
      //.map(response => response.json());
  }
  getPhotos(vehicleId){
    return  this.http.get(`https://localhost:44363/api/vehicles/${vehicleId}/photos`);
  }
}
