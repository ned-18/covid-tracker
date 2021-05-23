import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasesService } from '../../../../../services/cases.service';
import { MessageService } from 'primeng/api';

import { Data } from '../../../../../models/Country';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-status',
  templateUrl: './all-status.component.html',
  styleUrls: ['./all-status.component.css']
})
export class AllStatusComponent implements OnInit, OnDestroy {
  sub: Subscription;
  dataAllStatus: Data;
  dateAllStatus: string;
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
        this.onSelectGetCountryDataAllStatus(params.country);
      }
    });
  }

  private onSelectGetCountryDataAllStatus(country: string): void {
    this.isLoading = true;
    this.cases.getCountryDataChartAllStatus(country).subscribe({
      next: (respone) => {
          this.dataAllStatus = respone.data;
          this.dateAllStatus = respone.date;
          this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.cases.message$.next(`Please try another country. Data of "${country}" is not available now.`);
          this.isLoading = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!' });
          this.isLoading = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
