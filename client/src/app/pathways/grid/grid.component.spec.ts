import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayGridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: PathwayGridComponent;
  let fixture: ComponentFixture<PathwayGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
