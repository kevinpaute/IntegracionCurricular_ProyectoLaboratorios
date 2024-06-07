import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMateriasComponent } from './catalogo-materias.component';

describe('CatalogoMateriasComponent', () => {
  let component: CatalogoMateriasComponent;
  let fixture: ComponentFixture<CatalogoMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoMateriasComponent]
    });
    fixture = TestBed.createComponent(CatalogoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
