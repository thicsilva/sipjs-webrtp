import { TestBed } from '@angular/core/testing';

import { RecordCallService } from './record-call.service';

describe('RecordCallService', () => {
  let service: RecordCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
