import { TestBed } from '@angular/core/testing';

import { RevisionEquiposService } from './revision-equipos.service';

describe('RevisionEquiposService', () => {
  let service: RevisionEquiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionEquiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
