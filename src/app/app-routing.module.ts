import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehiclelistComponent } from './components/vehiclelist/vehiclelist.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

const routes: Routes = [
  {path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleFormComponent },
  { path: 'vehicles/edit/:id', component:  VehicleFormComponent },
  { path: 'vehicles/:id', component: ViewVehicleComponent },
  { path: 'vehiclesList', component: VehiclelistComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
