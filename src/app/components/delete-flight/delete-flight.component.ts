import { Component } from '@angular/core';
import { AirlineService } from '../../services/airline.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css'],
})
export class DeleteFlightComponent {
  flightForm!: FormGroup;

  constructor(
    private airlineService: AirlineService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      providerCode: ['', [Validators.required, Validators.minLength(3)]],
      providerType: ['', [Validators.required]],
    });
  }

  onDelete() {
    this.flightForm.markAllAsTouched();
    if (this.flightForm.invalid) {
      return;
    }
    const provideCode = this.flightForm.controls['providerCode'].value;
    const providerType = this.flightForm.controls['providerType'].value;
    const airline = this.airlineService.getAirlineByCodeType(
      provideCode,
      providerType
    );
    if (airline) {
      this.airlineService.deleteAirline(airline.id);
      this.router.navigate(['/']);
    } else {
      alert('Airline not found');
    }
  }
}
