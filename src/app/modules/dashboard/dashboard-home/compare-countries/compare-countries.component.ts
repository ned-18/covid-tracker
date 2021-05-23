import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../../../services/cases.service';
import { MessageService } from 'primeng/api';

import { Countries } from '../../../../models/Countries';
import { Country } from '../../../../models/Country';
import { colors } from './colors';

@Component({
  selector: 'app-compare-countries',
  templateUrl: './compare-countries.component.html',
  styleUrls: ['./compare-countries.component.css']
})
export class CompareCountriesComponent implements OnInit {
  isLoading: boolean;
  data = {
    labels: ['Confirmed', 'Active', 'Deaths', 'Recovered'],
    datasets: []
  };

  constructor(
    private cases: CasesService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void { }

  getData(data: Countries[]): void {
    data.forEach(d => {
      this.getCountryData(d.slug);
    });
  }

  private getCountryData(country: string): void {
    this.isLoading = true;
    const slug = country.toLocaleLowerCase().split(' ').join('-');
    this.cases.getCountryData(slug).subscribe({
      next: (respone) => {
        this.showData(respone);
        this.isLoading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!' });
        this.isLoading = false;
      }
    });
  }

  private showData(c: Country): void {
    const cases = [c.Confirmed, c.Active, c.Deaths, c.Recovered];
    const countryName = c.Country;

    if (this.data.datasets.length >= 2) {
      this.data.datasets = [];
    }

    if (this.data.datasets.length === 0) {
      this.data.datasets.push({
        label: countryName,
        ...colors[0],
        data: cases
      });
    } else if (this.data.datasets.length === 1) {
      this.data.datasets.push({
        label: countryName,
        ...colors[1],
        data: cases
      });
    }
  }
}


