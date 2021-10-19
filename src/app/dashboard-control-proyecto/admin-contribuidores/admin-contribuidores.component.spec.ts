import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContribuidoresComponent } from './admin-contribuidores.component';

describe('AdminContribuidoresComponent', () => {
  let component: AdminContribuidoresComponent;
  let fixture: ComponentFixture<AdminContribuidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContribuidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContribuidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
