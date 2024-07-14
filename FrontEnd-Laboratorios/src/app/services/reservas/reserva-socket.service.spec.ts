import { TestBed } from '@angular/core/testing';

import { ReservaSocketService } from './reserva-socket.service';

describe('ReservaSocketService', () => {
  let service: ReservaSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
