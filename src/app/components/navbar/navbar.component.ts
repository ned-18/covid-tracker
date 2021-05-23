import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CasesService } from '../../services/cases.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('f', { static: false }) searchForm: NgForm;
  menuItems: MenuItem[];
  searchText = '';
  countries: string[] = [];

  constructor(
    private cases: CasesService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: '/dashboard'
      }
    ];

    this.getAllCountries();
  }

  private getAllCountries(): void {
    this.cases.getAllCountriesName().subscribe({
      next: (respone) => {
        respone.forEach(c => {
          this.countries.push(c.name);
        });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!' });
      }
    });
  }

  onSubmit(c?: string): void {
    const country = c || this.searchForm.value.search;
    const slug = country.toLocaleLowerCase().split(' ').join('-');
    this.router.navigate(['/country'], { queryParams: { search: slug} });
    this.searchForm.reset();
  }

  searchCountry(event: string): void {
    this.onSubmit(event);
  }
}
