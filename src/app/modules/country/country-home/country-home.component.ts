import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CasesService } from '../../../services/cases.service';

import { Country } from '../../../models/Country';

@Component({
  selector: 'app-country-home',
  templateUrl: './country-home.component.html',
  styleUrls: ['./country-home.component.css']
})
export class CountryHomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  country: Country;
  searchParam: string;
  flagSrc: string;
  isLoading: boolean;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private cases: CasesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.searchParam = params.search;
      this.getCountryData(params.search);
    });
  }

  private getCountryData(searchParam: string): void {
    this.isLoading = true;
    this.cases.getCountryData(searchParam).subscribe({
      next: (respone => {
        this.country = respone;
        this.flagSrc = `https://www.countryflags.io/${this.country.CountryCode}/flat/64.png`;
        this.isLoading = false;
        this.error = false;
      }),
      error: ((error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 404) {
          this.error = true;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!' });
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


