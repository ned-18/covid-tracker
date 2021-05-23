import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAboutCountryComponent } from './more-about-country.component';

describe('MoreAboutCountryComponent', () => {
  let component: MoreAboutCountryComponent;
  let fixture: ComponentFixture<MoreAboutCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreAboutCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreAboutCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
