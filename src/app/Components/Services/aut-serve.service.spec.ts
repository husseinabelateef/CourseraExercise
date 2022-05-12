import { TestBed } from '@angular/core/testing';

import { AutServeService } from './aut-serve.service';

describe('AutServeService', () => {
  let service: AutServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
