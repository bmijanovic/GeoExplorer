import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesCompareComponent } from './countries-compare.component';

describe('CountriesCompareComponent', () => {
  let component: CountriesCompareComponent;
  let fixture: ComponentFixture<CountriesCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
