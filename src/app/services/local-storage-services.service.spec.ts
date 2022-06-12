import { TestBed } from '@angular/core/testing';

import { LocalStorageServicesService } from './local-storage-services.service';

describe('LocalStorageServicesService', () => {
  let service: LocalStorageServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
