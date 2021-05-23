import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-error',
  templateUrl: './search-error.component.html',
  styleUrls: ['./search-error.component.css']
})
export class SearchErrorComponent implements OnInit {
  @Input() searchTerm: string;

  constructor() { }

  ngOnInit(): void {
  }

}
