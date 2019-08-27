import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPatientComponent } from './submit-patient.component';

describe('SubmitPatientComponent', () => {
  let component: SubmitPatientComponent;
  let fixture: ComponentFixture<SubmitPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
