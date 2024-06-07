import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCatalogoMateriasComponent } from './crear-catalogo-materias.component';

describe('CrearCatalogoMateriasComponent', () => {
  let component: CrearCatalogoMateriasComponent;
  let fixture: ComponentFixture<CrearCatalogoMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCatalogoMateriasComponent]
    });
    fixture = TestBed.createComponent(CrearCatalogoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
