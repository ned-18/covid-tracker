import { Component, Input, OnInit } from '@angular/core';
import { WorldTotalCases } from '../../../models/GlobalCases';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cases: WorldTotalCases;
  constructor() { }

  ngOnInit(): void { }
}
