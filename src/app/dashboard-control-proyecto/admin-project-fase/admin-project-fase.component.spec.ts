import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectFaseComponent } from './admin-project-fase.component';

describe('AdminProjectFaseComponent', () => {
  let component: AdminProjectFaseComponent;
  let fixture: ComponentFixture<AdminProjectFaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectFaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
