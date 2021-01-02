import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveVehicle } from '../models/Vehicle';
@Injectable({
  providedIn: 'root'
})
 export class VechileService {
baseUrl= 'https://localhost:44363/api/'
  constructor(private http: HttpClient) { }
  getMakes(){
    return this.http.get(this.baseUrl +'makes');
    // map((response=>response.json()));
  }
  getFeatures(){
    return this.http.get(this.baseUrl +'feature');
  }
  create(vehicle){
return this.http.post(this.baseUrl +'Vehicles/vehicles' , vehicle)

}
getVehicles(id){
var res= this.http.get(this.baseUrl +'Vehicles/' + id);
return res;
}
update(vehicle:SaveVehicle){
return this.http.put(this.baseUrl +'Vehicles/' + vehicle.id, vehicle);
 }
 delete(id){
  return this.http.get(this.baseUrl +'Vehicles/' + id);
 }
 getVehicleList(filter){
   console.log(this.baseUrl +'Vehicles/' + '?' + this.toQueryString(filter));
  return this.http.get(this.baseUrl +'Vehicles/' + '?' + this.toQueryString(filter));

  }
  toQueryString(obj){
    var parts =[];
    for(var property in obj){
      var value = obj[property];
      if(value !== null && value !== undefined)
      parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }
}
