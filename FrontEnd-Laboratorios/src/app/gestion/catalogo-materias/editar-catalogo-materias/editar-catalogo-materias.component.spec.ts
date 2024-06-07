import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCatalogoMateriasComponent } from './editar-catalogo-materias.component';

describe('EditarCatalogoMateriasComponent', () => {
  let component: EditarCatalogoMateriasComponent;
  let fixture: ComponentFixture<EditarCatalogoMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCatalogoMateriasComponent]
    });
    fixture = TestBed.createComponent(EditarCatalogoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
