import { Component, OnInit } from '@angular/core';
import { FeatureService } from 'src/app/services/feature.service';
import { VechileService } from 'src/app/services/vechile.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
 makes: any[];
 models:any;
 features: any[];
 vehicle:any ={}
  constructor(private vechileService: VechileService,
              ) { }

  ngOnInit(): void {
    this.vechileService.getMakes().subscribe((make:any)=>{
      this.makes = make;
      console.log("makes",typeof(this.makes));
    });
    this.vechileService.getFeatures().subscribe((feature:any)=>{
      this.features = feature;
      console.log("makes", this.models);
    })
  }
    onMakeChange(){
     var selectedMake= this.makes.find(m => m.id == this.vehicle.make);
     console.log("hi", selectedMake)
     this.models =  selectedMake ? selectedMake.models  : [];
     console.log("vechile",this.vehicle);

  }

}
