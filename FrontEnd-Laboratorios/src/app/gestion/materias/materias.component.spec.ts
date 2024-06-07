import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasComponent } from './materias.component';

describe('MateriasComponent', () => {
  let component: MateriasComponent;
  let fixture: ComponentFixture<MateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriasComponent]
    });
    fixture = TestBed.createComponent(MateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
