import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDocenteComponent } from './reservas-docente.component';

describe('ReservasDocenteComponent', () => {
  let component: ReservasDocenteComponent;
  let fixture: ComponentFixture<ReservasDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasDocenteComponent]
    });
    fixture = TestBed.createComponent(ReservasDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
