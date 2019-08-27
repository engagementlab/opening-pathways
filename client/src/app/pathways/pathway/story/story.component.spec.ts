import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayStoryComponent } from './story.component';

describe('StoryComponent', () => {
  let component: PathwayStoryComponent;
  let fixture: ComponentFixture<PathwayStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
