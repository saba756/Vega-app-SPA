import { Component, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from 'src/app/models/Vehicle';
import { VechileService } from 'src/app/services/vechile.service';

@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {
 private readonly PAGE_SIZE = 3;
queryResult : any ={};
makes: KeyValuePair[];
query : any= {
  pageSize: this.PAGE_SIZE
}
columns = [
  { title: 'Id' },
  { title: 'Contact Name', key: 'contactName', isSortable: true },
  { title: 'Make', key: 'make', isSortable: true },
  { title: 'Model', key: 'model', isSortable: true },
  { }
];
  constructor(private vehicleService:VechileService) { }

  ngOnInit(): void {
    console.log("hi")
    this.vehicleService.getMakes().subscribe((makesresponse:any)=>{
      this.makes = makesresponse;
      console.log("make", this.makes);
    })
    this.populateVehicle();
  }
  populateVehicle(){
    this.vehicleService.getVehicleList(this.query)
      .subscribe(result => this.queryResult = result);
  }
onFilterChange(){
  this.query.page = 1;
this.populateVehicle();
}
sortBy(columnName){
  if(this.query.sortBy === columnName){
      this.query.isSortAscending =  !this.query.isSortAscending;
  }
  else{
    this.query.sortBy = columnName;
    this.query.isSortAscending = true;
  }
  this.populateVehicle();
}
resetFilter(){
this.query ={
  page:1,
  pageSize:this.PAGE_SIZE
};
this.onFilterChange();
}

onPageChange(page){
  console.log(page);
this.query.page = page;
this.populateVehicle();
}
}
