import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';
import { ViewFlightsComponent } from './components/view-flights/view-flights.component';
import { UpdateFlightComponent } from './components/update-flight/update-flight.component';
import { DeleteFlightComponent } from './components/delete-flight/delete-flight.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    CreateFlightComponent,
    DeleteFlightComponent,
    HomeComponent,
    UpdateFlightComponent,
    ViewFlightsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
