import { TestBed } from '@angular/core/testing';

import { WindmillPartService } from './windmill-part.service';

describe('WindmillPartService', () => {
  let service: WindmillPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindmillPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
