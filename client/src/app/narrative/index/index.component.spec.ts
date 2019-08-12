import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativeIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: NarrativeIndexComponent;
  let fixture: ComponentFixture<NarrativeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrativeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
