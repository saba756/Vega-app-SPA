import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from 'src/app/services/photo.service';
import { VechileService } from 'src/app/services/vechile.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  @ViewChild('fileInput')fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos : any[];
  constructor(
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private photoService: PhotoService,
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
    debugger
    this.photoService.getPhotos(this.vehicleId)
    .subscribe((photos:any) =>
    {
      this.photos = photos
    console.log("images",this.photos)
    }
    );

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
  uploadPhoto(){
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.photoService.upload(this.vehicleId , nativeElement.files[0])
    .subscribe(photo=>{
      this.photos.push(photo);
      console.log(photo)
    })
  }

  transform(images: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(images);
}

}
