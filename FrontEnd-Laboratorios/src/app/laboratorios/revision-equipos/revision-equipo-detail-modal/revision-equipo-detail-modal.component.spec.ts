import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionEquipoDetailModalComponent } from './revision-equipo-detail-modal.component';

describe('RevisionEquipoDetailModalComponent', () => {
  let component: RevisionEquipoDetailModalComponent;
  let fixture: ComponentFixture<RevisionEquipoDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionEquipoDetailModalComponent]
    });
    fixture = TestBed.createComponent(RevisionEquipoDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
