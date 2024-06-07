import { TestBed } from '@angular/core/testing';

import { CatalogoMateriasService } from './catalogo-materias.service';

describe('CatalogoMateriasService', () => {
  let service: CatalogoMateriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoMateriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
