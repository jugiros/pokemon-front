import { TestBed } from '@angular/core/testing';

import { FunctionServicesService } from './function-services.service';

describe('FunctionServicesService', () => {
  let service: FunctionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
