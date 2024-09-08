import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineService, Airline } from '../../services/airline.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
})
export class CreateFlightComponent implements OnInit {
  flightForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private airlineService: AirlineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      providerName: ['', [Validators.required, Validators.maxLength(10)]],
      providerCode: [{ value: '', disabled: true }, Validators.required],
      providerType: ['', [Validators.required]],
    });
  }

  onProviderNameChange(name: any) {
    this.flightForm.controls['providerCode'].setValue(name?.target?.value);
  }

  onSubmit() {
    this.flightForm.markAllAsTouched();
    if (this.flightForm.valid) {
      const newAirline: Airline = {
        ...this.flightForm.value,
        id: 0,
        providerCode: this.flightForm.controls['providerCode'].value,
        providerName: this.airlineService.getAirlineDataByCode(
          this.flightForm.controls['providerCode'].value
        )?.providerName,
      };
      this.airlineService.addAirline(newAirline);
      this.router.navigate(['/']);
    }
  }
}
