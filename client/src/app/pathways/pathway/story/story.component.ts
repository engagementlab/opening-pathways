import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class PathwayStoryComponent implements OnInit {

  public content: any;
  public pathway: any;
  public hasContent: boolean; 

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe((p) => {

      this._dataSvc.getDataForUrl('/api/pathway/get/' + p['pid']).subscribe((pathway) => {

        this.pathway = pathway;

        this._dataSvc.getDataForUrl('/api/story/get/' + p['id']).subscribe((response) => {
          
          this.content = response;
          this.hasContent = true;
          
        });
      });

    });

  }

}
