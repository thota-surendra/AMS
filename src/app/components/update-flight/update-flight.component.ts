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
  ) {}

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
    const airline = this.airlineService.getAirlineByCode(code);
    if (airline) {
      const updatedAirline: Airline = {
        ...airline,
        providerType: this.flightForm.get('providerType')?.value,
      };
      this.airlineService.updateAirline(airline.id, updatedAirline);
      this.router.navigate(['/']);
    } else {
      alert('Airline not found');
    }
  }
}
