import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { PrimeNgModule } from '../../primeng.module';
import { CountryHomeComponent } from './country-home/country-home.component';
import { SearchErrorComponent } from './country-home/search-error/search-error.component';


@NgModule({
  declarations: [
    CountryHomeComponent,
    SearchErrorComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    PrimeNgModule
  ]
})
export class CountryModule { }
