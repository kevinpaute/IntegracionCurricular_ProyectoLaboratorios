import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriosComponent } from './laboratorios.component';

describe('LaboratoriosComponent', () => {
  let component: LaboratoriosComponent;
  let fixture: ComponentFixture<LaboratoriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoriosComponent]
    });
    fixture = TestBed.createComponent(LaboratoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
