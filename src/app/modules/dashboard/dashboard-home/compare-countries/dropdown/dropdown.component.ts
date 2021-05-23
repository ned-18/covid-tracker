import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasesService } from '../../../../../services/cases.service';
import { MessageService } from 'primeng/api';

import { Countries } from '../../../../../models/Countries';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  sub: Subscription;
  selectedCountries: Countries[] = [];
  countries: Countries[];
  isLoading: boolean;
  @Output() getChartData = new EventEmitter<Countries[]>();

  constructor(
    private cases: CasesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCountriesName();
  }

  onSelectCountries(): void {
    this.router.navigate(['dashboard/countries'], {
      queryParams:
      {
        firstCountry: this.selectedCountries[0]?.slug,
        secondCountry: this.selectedCountries[1]?.slug,
      }
    });
    if (this.selectedCountries.length >= 2) {
      this.getChartData.emit(this.selectedCountries);
    }
  }

  private getAllCountriesName(): void {
    this.isLoading = true;
    this.cases.getAllCountriesName().subscribe({
      next: (respone) => {
        this.countries = respone;
        this.isLoading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!' });
        this.isLoading = false;
      }
    });
  }
}
