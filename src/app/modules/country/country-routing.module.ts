import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryHomeComponent } from './country-home/country-home.component';

const routes: Routes = [
  { path: '', component: CountryHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
