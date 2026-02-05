import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidCustomersComponent } from './paid-customers.component';

describe('PaidCustomersComponent', () => {
  let component: PaidCustomersComponent;
  let fixture: ComponentFixture<PaidCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidCustomersComponent]
    });
    fixture = TestBed.createComponent(PaidCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
