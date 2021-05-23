import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasesService } from '../../../../../services/cases.service';

import { Data } from '../../../../../models/Country';

@Component({
  selector: 'app-by-date',
  templateUrl: './by-date.component.html',
  styleUrls: ['./by-date.component.css']
})
export class ByDateComponent implements OnInit, OnDestroy {
  sub: Subscription;
  dataByDateAllStatus: Data;
  rangeDates: Date[];
  minDateValue = new Date('2020-02-01T00:00:00Z');
  maxDateValue = new Date();
  from: string;
  to: string;
  isLoading: boolean;
  constructor(
    private cases: CasesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}

  onSelect(): void {
    this.from = this.rangeDates[0]?.toISOString().split('T')[0];
    this.to = this.rangeDates[1]?.toISOString().split('T')[0];
    this.sub = this.route.queryParams.subscribe(params => {
      if (this.from && this.to) {
        this.onSelectGetCountryDataByDateAllStatus(params.country, this.from, this.to);
      }
    });
  }

  private onSelectGetCountryDataByDateAllStatus(country: string, from: string, to: string): void {
    this.isLoading = true;
    this.cases.getCountryDataChartByDateAllStatus(country, from, to).subscribe({
      next: (respone) => {
        this.dataByDateAllStatus = respone;
        this.isLoading = false;
      },
      error: (error) => { console.log(error); }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
