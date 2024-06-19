import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionEquipoModalComponent } from './revision-equipo-modal.component';

describe('RevisionEquipoModalComponent', () => {
  let component: RevisionEquipoModalComponent;
  let fixture: ComponentFixture<RevisionEquipoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionEquipoModalComponent]
    });
    fixture = TestBed.createComponent(RevisionEquipoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
