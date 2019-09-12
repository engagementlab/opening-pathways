import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayIndexComponent } from './index.component';

describe('PathwayIndexComponent', () => {
  let component: PathwayIndexComponent;
  let fixture: ComponentFixture<PathwayIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
