import { TestBed } from '@angular/core/testing';

import { ResolversService } from './resolvers.service';

describe('ResolversService', () => {
  let service: ResolversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
