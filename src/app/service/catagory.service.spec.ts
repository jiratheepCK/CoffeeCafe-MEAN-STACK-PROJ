import { TestBed } from '@angular/core/testing';

import { CatagoryService } from './catagory.service';

describe('CatagoryService', () => {
  let service: CatagoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatagoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
