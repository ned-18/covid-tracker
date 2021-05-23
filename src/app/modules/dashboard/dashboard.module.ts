import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimeNgModule } from '../../primeng.module';
import { FormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SidebarComponent } from './dashboard-home/sidebar/sidebar.component';
import { CompareCountriesComponent } from './dashboard-home/compare-countries/compare-countries.component';
import { MoreAboutCountryComponent } from './dashboard-home/more-about-country/more-about-country.component';
import { AllStatusComponent } from './dashboard-home/more-about-country/all-status/all-status.component';
import { ByStatusComponent } from './dashboard-home/more-about-country/by-status/by-status.component';
import { ByDateComponent } from './dashboard-home/more-about-country/by-date/by-date.component';
import { DropdownComponent } from './dashboard-home/compare-countries/dropdown/dropdown.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    SidebarComponent,
    CompareCountriesComponent,
    MoreAboutCountryComponent,
    AllStatusComponent,
    ByStatusComponent,
    ByDateComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class DashboardModule { }
