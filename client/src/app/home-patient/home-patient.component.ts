import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

import * as ismobile from 'ismobilejs';
import { Drawing } from '../utils/drawing';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.scss']
})
export class HomePatientComponent implements OnInit {

  public intro: any;
  public pathways: any[];
  public hasContent: boolean;

  public colorIndices: object = {};
  public customOptions: OwlOptions;
  public slideWidth = 440;

  constructor(private _dataSvc: DataService, private _draw: Drawing) {

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

    this._dataSvc.getDataForUrl('/api/data/get/home-patient').subscribe((intro) => {

      this.intro = intro[0];
      
      this._dataSvc.getDataForUrl('/api/pathway/limit/2').subscribe((response) => {
        
        this.pathways = response;

        // Make randomized colors for pathway shape
        for(let p in this.pathways)
          this.colorIndices[p] = this._draw.shapeColors(this.pathways[p]['stories'].length);

        this.hasContent = true;

      });
    });

  }

  sliderInit(sliderIndex: number) {

    // Draw SVG lines between all story names in slider
    setTimeout(() => {

      this._draw.pathways(sliderIndex);
      
    }, 50);

  }

  slideChange(slideInfo: SlidesOutputData, sliderIndex: number) {
    console.log(slideInfo, slideInfo.slides[slideInfo.slides.length-1])
  }

}
