import { TestBed } from '@angular/core/testing';

import { SharedCommunicationServiceService } from './shared-communication.service';

describe('SharedCommunicationServiceService', () => {
  let service: SharedCommunicationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCommunicationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
