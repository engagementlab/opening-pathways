import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import { OwlOptions } from 'ngx-owl-carousel-o';

import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PathwayIndexComponent implements OnInit {

  public pathways: any[];
  public hasContent: boolean;

  public customOptions: OwlOptions;
  public slideWidth = 440;

  constructor(private _dataSvc: DataService) {

    this.customOptions = {
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoHeight: true,
      autoWidth: true,
      dots: false,
      items: ismobile.phone ? 1 : 3,
      
      navSpeed: 700,
      margin: 10,
      stagePadding: 50
    };

    if(ismobile.tablet)
      this.slideWidth = 360;
    else if(ismobile.phone)
      this.slideWidth = 220;
    
  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/pathway/all').subscribe((response) => {
        
      this.pathways = response;
      this.hasContent = true;
      
    });

  }

}
