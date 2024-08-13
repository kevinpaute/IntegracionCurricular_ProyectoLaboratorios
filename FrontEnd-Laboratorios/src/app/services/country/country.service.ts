import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  name: {
    common: string;
  };
  region: string;
  subregion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  groupCountriesByContinent(countries: Country[]): { [key: string]: Country[] } {
    const continents: { [key: string]: Country[] } = {
      'Latinoamérica': [],
      'América del Norte': [],
      'Europa': [],
      'Asia': [],
      'África': [],
      'Oceanía': [],
      'Antártida': []
    };

    countries.forEach((country: Country) => {
      const region = country.region;
      const subregion = country.subregion;

      if (subregion && ['South America', 'Central America', 'Caribbean'].includes(subregion)) {
        continents['Latinoamérica'].push(country);
      } else if (region === 'Americas') {
        continents['América del Norte'].push(country);
      } else if (region === 'Europe') {
        continents['Europa'].push(country);
      } else if (region === 'Asia') {
        continents['Asia'].push(country);
      } else if (region === 'Africa') {
        continents['África'].push(country);
      } else if (region === 'Oceania') {
        continents['Oceanía'].push(country);
      } else if (region === 'Antarctic') {
        continents['Antártida'].push(country);
      }
    });

    return continents;
  }
}