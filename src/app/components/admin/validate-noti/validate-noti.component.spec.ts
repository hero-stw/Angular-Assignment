import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateNotiComponent } from './validate-noti.component';

describe('ValidateNotiComponent', () => {
  let component: ValidateNotiComponent;
  let fixture: ComponentFixture<ValidateNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateNotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
