import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasesService } from '../../../../services/cases.service';
import { MessageService } from 'primeng/api';

import { Countries } from '../../../../models/Countries';

@Component({
  selector: 'app-more-about-country',
  templateUrl: './more-about-country.component.html',
  styleUrls: ['./more-about-country.component.css']
})
export class MoreAboutCountryComponent implements OnInit, OnDestroy {
  subParam: Subscription;
  subMessage: Subscription;
  selectedCountry: Countries = { slug: '', name: '' };
  countries: Countries[];
  message: string;
  isLoading: boolean;

  constructor(
    private cases: CasesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subMessage = this.cases.message$.subscribe(message => {
      this.message = message;
    });

    this.getAllCountriesName();
    this.subParam = this.route.queryParams.subscribe(params => {
      if (params && Object.keys(params).length === 0 && params.constructor === Object) {
        return;
      } else {
        const str = params.country.split('-').join(' ');
        const name = str.split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        this.selectedCountry.slug = params.country;
        this.selectedCountry.name = name;
      }
    });
  }

  onSelect(): void {
    this.router.navigate(['dashboard/country'], { queryParams: { country: this.selectedCountry.slug } });
    this.cases.message$.next(null);
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

  ngOnDestroy(): void {
    this.subParam?.unsubscribe();
    this.subMessage?.unsubscribe();
  }
}

