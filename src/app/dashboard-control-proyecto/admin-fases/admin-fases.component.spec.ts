import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFasesComponent } from './admin-fases.component';

describe('AdminFasesComponent', () => {
  let component: AdminFasesComponent;
  let fixture: ComponentFixture<AdminFasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
