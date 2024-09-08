import { Injectable } from '@angular/core';

export interface Airline {
  id: number;
  providerName: string;
  providerCode: string;
  providerType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  private airlines: Airline[] = [];
  private airlinesData: Airline[] = [
    {
      id: 1,
      providerName: 'Jet Airways',
      providerCode: '9W-',
      providerType: 'Domestic',
    },
    {
      id: 2,
      providerName: 'SpiceJet',
      providerCode: 'SG-',
      providerType: 'Domestic',
    },
    {
      id: 3,
      providerName: 'Indigo',
      providerCode: '6E-',
      providerType: 'Domestic',
    },
    {
      id: 4,
      providerName: 'Air India',
      providerCode: 'AI-',
      providerType: 'Domestic',
    },
    {
      id: 5,
      providerName: 'Go Air',
      providerCode: 'G8-',
      providerType: 'Domestic',
    },
  ];

  getAirlines(): Airline[] {
    return [...this.airlines];
  }

  addAirline(airline: Airline) {
    airline.id = this.airlines.length + 1;
    this.airlines.push(airline);
  }

  updateAirline(id: number, updatedAirline: Airline) {
    const index = this.airlines.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.airlines[index] = updatedAirline;
    }
  }

  deleteAirline(id: number) {
    this.airlines = this.airlines.filter((a) => a.id !== id);
  }

  getAirlineDataByCode(providerCode: string): Airline | undefined {
    return this.airlinesData.find((a) => a.providerCode === providerCode);
  }

  getAirlineByCode(providerCode: string): Airline | undefined {
    return this.airlines.find((a) => a.providerCode === providerCode);
  }

  getAirlineByCodeType(providerCode: string,providerType: string): Airline | undefined {
    return this.airlines.find((a) => a.providerCode === providerCode && a.providerType==providerType);
  }
}
