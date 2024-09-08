import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineService, Airline } from '../../services/airline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css'],
})
export class UpdateFlightComponent implements OnInit {
  flightForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private airlineService: AirlineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      providerCode: ['', [Validators.required, Validators.minLength(3)]],
      providerType: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.flightForm.markAllAsTouched();
    if (!this.flightForm.valid) {
      return;
    }
    const code = this.flightForm.get('providerCode')?.value;
    const type = this.flightForm.get('providerType')?.value;
    this.airlineService.getAirlineByCodeType(code, type).subscribe(flightExists => {
      if (flightExists.length > 0) {
        this.airlineService.showError('Given Flight details already exists!');
      } else {
        this.airlineService.getAirlineByCode(code).subscribe(airlines => {
          const airline = airlines[0];
          if (airline) {
            const updatedAirline: Airline = {
              ...airline,
              providerType: type,
            };
            this.airlineService.updateAirline(airline.id, updatedAirline).subscribe(x => {
              this.airlineService.showSuccess('Flight details added successfully!');
              this.router.navigate(['/']);
            });
          } else {
            this.airlineService.showError('Given Flight details are not found!');
          }
        });
      }
    });


  }
}
