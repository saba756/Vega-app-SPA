import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { SaveVehicle, Vehicle } from 'src/app/models/Vehicle';
import { VechileService } from 'src/app/services/vechile.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };
  constructor(private vechileService: VechileService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              ) {
                route.params.subscribe(p =>{
                  this.vehicle.id = + p['id'] || 0;
                })
              }

  ngOnInit(): void {
    var sources =[
      this.vechileService.getMakes(),
      this.vechileService.getFeatures(),
    ];
    if(this.vehicle.id)
    sources.push(this.vechileService.getVehicles(this.vehicle.id))
    Observable.forkJoin(sources).subscribe(
      (data:any) => {
        this.makes =data[0];
        this.features= data[1];
        if(this.vehicle.id)
        {
          this.setVehicle(data[2])
          this.populateModules();
        }

      }
    ), err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    }
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id')
  }
  private populateModules() {
    var selectedMake= this.makes.find(m => m.id == this.vehicle.makeId);
    this.models =  selectedMake ? selectedMake.models  : [];
  }
    onMakeChange(){
      this.populateModules()
    delete this.vehicle.modelId
  }
  onFeatureToggle(featureId , $event)
  {
    if($event.target.checked)
    this.vehicle.features.push(featureId)
    else {
      var index = this.vehicle.features.indexOf(featureId)
      this.vehicle.features.splice(index)
    }
  }
  onSubmit(){
    var result$ = (this.vehicle.id) ? this.vechileService.update(this.vehicle) : this.vechileService.create(this.vehicle);
    result$.subscribe(vehicle => {
      // console.log("hiii", vehicle.id)
        this.toastr.success("the vehicle was successfully updated" , 'success' ,{
        timeOut:  5000
        });
        this.router.navigate(['/vehicles/']);
      });
    }

    }




