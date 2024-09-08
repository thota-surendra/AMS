import { Component, OnInit } from '@angular/core';
import { AirlineService, Airline } from '../../services/airline.service';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css'],
})
export class ViewFlightsComponent implements OnInit {
  airlines: Airline[] = [];
  filteredAirlines: Airline[] = [];

  constructor(private airlineService: AirlineService) {}

  ngOnInit(): void {
     this.airlineService.getAirlines().subscribe(airlines=>{
      this.airlines=airlines;
      this.filteredAirlines = this.airlines;
    }); 
  }

  onFilterChange(filter: any) {
    filter = filter?.target?.value?.toLowerCase();
    this.filteredAirlines = this.airlines.filter((airline) =>
      airline.providerType?.toLowerCase().includes(filter)
    );
  }
}
