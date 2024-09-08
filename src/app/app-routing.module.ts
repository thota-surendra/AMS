import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';
import { ViewFlightsComponent } from './components/view-flights/view-flights.component';
import { UpdateFlightComponent } from './components/update-flight/update-flight.component';
import { DeleteFlightComponent } from './components/delete-flight/delete-flight.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-flight', component: CreateFlightComponent },
  { path: 'view-flights', component: ViewFlightsComponent },
  { path: 'update-flight', component: UpdateFlightComponent },
  { path: 'delete-flight', component: DeleteFlightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
