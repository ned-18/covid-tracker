import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasesService } from '../../../../../services/cases.service';
import { MessageService } from 'primeng/api';
import { UIChart } from 'primeng/chart';

import { Data } from '../../../../../models/Country';

@Component({
  selector: 'app-by-status',
  templateUrl: './by-status.component.html',
  styleUrls: ['./by-status.component.css']
})
export class ByStatusComponent implements OnInit, OnDestroy {
  @ViewChild('chartByStatus') chart: UIChart;
  CHECKED_STATUS = 'confirmed';
  selectedCountry: string;
  sub: Subscription;
  dataByStatus: Data;
  dateByStatus: string;
  status = [
    { name: 'Confirmed', checked: true },
    { name: 'Deaths', checked: false },
    { name: 'Recovered', checked: false }
  ];
  isLoading: boolean;

  constructor(
    private cases: CasesService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      if (params && Object.keys(params).length === 0 && params.constructor === Object) {
        return;
      } else {
        this.selectedCountry = params.country;
        this.getCountryDataByStatusConfirmed(params.country);
        this.getNameOfCountry(this.selectedCountry);
      }
    });
  }

  changeCheckbox(i: number): void {
    this.status[i].checked = !this.status[i].checked;
    this.isLoading = true;
    if (this.status[i].checked) {
      this.cases.getCountryDataChartByStatus(this.selectedCountry, this.status[i].name.toLowerCase()).subscribe({
        next: (respone) => {
          this.isLoading = false;
          const index = this.dataByStatus.datasets.findIndex(c => c.label === this.status[i].name);
          if (index === -1) {
            this.dataByStatus.datasets.push(respone.data);
          } else { return; }
        },
        error: (error: HttpErrorResponse) => this.catchError(error)
      });
    } else {
      const index = this.dataByStatus.datasets.findIndex(c => c.label === this.status[i].name);
      if (index > -1) {
        this.dataByStatus.datasets.splice(index, 1);
        this.chart.refresh();
        this.isLoading = false;
      }
    }
  }

  private getCountryDataByStatusConfirmed(country: string): void {
    this.isLoading = true;
    this.cases.getCountryDataChartByStatus(country, this.CHECKED_STATUS).subscribe({
      next: (respone) => {
        this.dataByStatus = {
          labels: [this.getNameOfCountry(country)],
          datasets: [{ ...respone.data }]
        };

        this.dateByStatus = respone.date;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => this.catchError(error)
    });
  }

  private catchError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.cases.message$
        .next(`Please try another country. Data of "${this.getNameOfCountry(this.selectedCountry)}" is not available now.`);
      this.isLoading = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!' });
      this.isLoading = false;
    }
  }

  // Capitalize every first char of word
  private getNameOfCountry(str: string): string {
    const country = str.split('-').join(' ');
    const countryNameUpperCase = country.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    return countryNameUpperCase;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
