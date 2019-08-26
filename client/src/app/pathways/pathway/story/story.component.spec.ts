import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwatStoryComponent } from './story.component';

describe('StoryComponent', () => {
  let component: PathwatStoryComponent;
  let fixture: ComponentFixture<PathwatStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwatStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwatStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
