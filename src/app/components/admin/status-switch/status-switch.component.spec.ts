import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSwitchComponent } from './status-switch.component';

describe('StatusSwitchComponent', () => {
  let component: StatusSwitchComponent;
  let fixture: ComponentFixture<StatusSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
