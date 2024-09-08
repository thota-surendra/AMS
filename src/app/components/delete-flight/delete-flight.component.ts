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
  ) { }

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
    this.airlineService.getAirlineByCodeType(
      provideCode,
      providerType
    ).subscribe(airline => {
      if (airline && airline.length > 0) {
        this.airlineService.deleteAirline(airline[0].id).subscribe(x => {
          this.airlineService.showSuccess('Flight deleted successfully!');
          this.router.navigate(['/']);
        }, err => {
          this.airlineService.showError('Delete failed!');
        });

      } else {
        this.airlineService.showError('Airline not found!');
      }
    })

  }
}
