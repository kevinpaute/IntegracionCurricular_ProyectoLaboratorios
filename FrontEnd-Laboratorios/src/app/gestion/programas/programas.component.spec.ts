import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasComponent } from './programas.component';

describe('ProgramasComponent', () => {
  let component: ProgramasComponent;
  let fixture: ComponentFixture<ProgramasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramasComponent]
    });
    fixture = TestBed.createComponent(ProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
