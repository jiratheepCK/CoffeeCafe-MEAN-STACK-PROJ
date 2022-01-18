import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptlistComponent } from './receiptlist.component';

describe('ReceiptlistComponent', () => {
  let component: ReceiptlistComponent;
  let fixture: ComponentFixture<ReceiptlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
