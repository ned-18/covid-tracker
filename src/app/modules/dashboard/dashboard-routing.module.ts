import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CompareCountriesComponent } from './dashboard-home/compare-countries/compare-countries.component';
import { MoreAboutCountryComponent } from './dashboard-home/more-about-country/more-about-country.component';

const routes: Routes = [
  { path: '', redirectTo: 'country', pathMatch: 'full' },
  {
    path: '', component: DashboardHomeComponent, children: [
      { path: 'country', component: MoreAboutCountryComponent },
      { path: 'countries', component: CompareCountriesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
