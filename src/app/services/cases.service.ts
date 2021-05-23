import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { SummaryCases, WorldTotalCases } from '../models/GlobalCases';
import { Countries } from '../models/Countries';
import { Country, CountryByStatus, CountryChartAllStatus, CountryChartByStatus, Data } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  message$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  getAllCountriesName(): Observable<Countries[]> {
    return this.http.get<Countries[]>('../../assets/countries/countries.json');
  }

  getGlobalCases(): Observable<WorldTotalCases> {
    return this.http.get<SummaryCases>(`${environment.rootURL}/summary`).pipe(map(respone => {
      return respone.Global;
    }));
  }

  getCountryData(country: string): Observable<Country> {
    return this.http.get<Country[]>(`${environment.rootURL}/country/${country}`).pipe(map(respone => {
      return respone[respone.length - 1];
    }));
  }

  getCountryDataChartAllStatus(country: string): Observable<CountryChartAllStatus> {
    return this.http.get<Country[]>(`${environment.rootURL}/country/${country}`).pipe(map(respone => {
      const c = respone[respone.length - 1];
      const res = {
        data: {
          labels: ['Confirmed', 'Active', 'Deaths', 'Recovered'],
          datasets: [
            {
              label: c.Country,
              backgroundColor: '#7E57C2',
              data: [c.Confirmed, c.Active, c.Deaths, c.Recovered]
            },
          ]
        },
        date: new Date(c.Date).toDateString()
      };
      return res;
    }));
  }

  getCountryDataChartByStatus(country: string, status: string): Observable<CountryChartByStatus> {
    return this.http.get<CountryByStatus[]>(`${environment.rootURL}/country/${country}/status/${status}`).pipe(map(respone => {
      const c = respone[respone.length - 1];
      const capitalizedStatus = status[0].toUpperCase() + status.slice(1);
      let backgroundColor;
      switch (status) {
        case 'confirmed':
          backgroundColor = '#42A5F5';
          break;
        case 'deaths':
          backgroundColor = '#FFA726';
          break;
        case 'recovered':
          backgroundColor = '#66BB6A';
          break;
        default:
          backgroundColor = '#EC4074';
      }

      const res = {
        data: {
          label: capitalizedStatus,
          backgroundColor,
          data: [c.Cases]
        },
        date: new Date(c.Date).toDateString()
      };

      return res;
    }));
  }

  getCountryDataChartByDateAllStatus(country: string, from: string, to: string): Observable<Data> {
    const queryParam = `from=${from}&to=${to}`;
    return this.http.get<Country[]>(`${environment.rootURL}/country/${country}?${queryParam}`).pipe(map(respone => {
      const status = ['Confirmed', 'Active', 'Deaths', 'Recovered'];
      const res: Data = {
        labels: [],
        datasets: []
      };

      for (const s of status) {
        let bgColor;
        switch (s) {
          case 'Confirmed':
            bgColor = '#7E57C2';
            break;
          case 'Active':
            bgColor = '#42A5F5';
            break;
          case 'Deaths':
            bgColor = '#FFA726';
            break;
          case 'Recovered':
            bgColor = '#66BB6A';
            break;
          default:
            bgColor = '#EC4074';
        }

        res.datasets.push({
          label: s,
          backgroundColor: bgColor,
          data: [],
        });
      }

      for (const c of respone) {
        res.labels.push(new Date(c.Date).toDateString());
        for (let i = 0; i < status.length; i++) {
          res.datasets[i].data.push(c[status[i]]);
        }
      }

      return res;
    }));
  }
}
