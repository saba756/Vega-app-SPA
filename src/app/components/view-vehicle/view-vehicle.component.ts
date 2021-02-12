import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VechileService } from 'src/app/services/vechile.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private vehicleService:VechileService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit(): void {
    this.vehicleService.getVehicles(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }
  deleteVehicle(){
    if(confirm("Are you sure you want to delete")){
      this.vehicleService.delete(this.vehicle.id)
      .subscribe(x=>{
        this.router.navigate(['/home']);
      })
    }
  }
}
