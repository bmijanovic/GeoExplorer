import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonSearchComponent } from './comparison-search.component';

describe('ComparisonSearchComponent', () => {
  let component: ComparisonSearchComponent;
  let fixture: ComponentFixture<ComparisonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
