import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationCalenderComponent } from './vacation-calender.component';

describe('VacationCalenderComponent', () => {
  let component: VacationCalenderComponent;
  let fixture: ComponentFixture<VacationCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationCalenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacationCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
