import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { MessageService } from 'primeng/api';

import { WorldTotalCases } from '../../models/GlobalCases';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  casesData: WorldTotalCases;
  isLoading = false;

  constructor(
    private cases: CasesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getGlobalCases();
  }

  private getGlobalCases(): void {
    this.isLoading = true;
    this.cases.getGlobalCases().subscribe({
      next: (respone) => {
        this.casesData = respone;
        this.isLoading = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try later!'});
        this.isLoading = false;
      }
    });
  }
}
