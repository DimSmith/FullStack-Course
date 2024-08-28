import { TestBed } from '@angular/core/testing';

import { BankDBService } from './bank-db.service';

describe('BankDBService', () => {
  let service: BankDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
