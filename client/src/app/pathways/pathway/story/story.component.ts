import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/utils/data.service';

import * as _ from 'underscore';
import { PathwayGridComponent } from '../../grid/grid.component';
 
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class PathwayStoryComponent implements OnInit {

  public iconIndex: number;
  public iconColor: number;

  public content: any;
  public stories: any[];
  public next: any;
  public prev: any;
  
  public pathwayName: string;
  public pathwaySlug: string;

  public hasContent: boolean; 

  @ViewChild('grid', {static: false}) grid: PathwayGridComponent;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe((p) => {
      
      this._dataSvc.getDataForUrl('/api/story/get/' + p['id'] + '/' + p['pid']).subscribe((response) => {
        
        this.content = response.story;
        this.pathwayName = response.all.name;
        this.pathwaySlug = p['pid'];

        this.iconIndex = _.random(0, 11);
        this.iconColor = _.random(0, 11);

        // Pluck only most adjacent stories by date
        let allPrev = _.filter(response.all.stories, (s) => { return s.submitDate < response.story.submitDate});
        let prevStory = allPrev[allPrev.length-1];
        let nextStory = _.filter(response.all.stories, (s) => { return s.submitDate > response.story.submitDate})[0];
    
        this.prev = prevStory;
        this.next = nextStory;

        this.stories = response.all.stories;

        this.hasContent = true;

        setTimeout(() => { this.grid.openOverlay.next(false); }, 50);
        
      });

    });

  }

  public openStories() {

    this.grid.openOverlay.next(true);
     
  }

}
