import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationServiceComponent } from './reservation-service.component';

describe('ReservationServiceComponent', () => {
  let component: ReservationServiceComponent;
  let fixture: ComponentFixture<ReservationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
