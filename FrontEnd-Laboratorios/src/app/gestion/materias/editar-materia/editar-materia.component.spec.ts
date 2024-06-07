import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMateriaComponent } from './editar-materia.component';

describe('EditarMateriaComponent', () => {
  let component: EditarMateriaComponent;
  let fixture: ComponentFixture<EditarMateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMateriaComponent]
    });
    fixture = TestBed.createComponent(EditarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
