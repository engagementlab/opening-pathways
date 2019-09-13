import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import { OwlOptions } from 'ngx-owl-carousel-o';

import * as ismobile from 'ismobilejs';
import { Drawing } from '../utils/drawing';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PathwayIndexComponent implements OnInit {

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
      nav: true,
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

      // Make randomized colors for pathway shape
      for(let p in this.pathways)
        this.colorIndices[p] = this._draw.shapeColors(this.pathways[p]['stories'].length);

      this.hasContent = true;
      
    });

  }

  sliderInit(sliderIndex: number) {

    // Draw SVG lines between all story names in slider
    setTimeout(() => {

      this._draw.pathways(sliderIndex);

      let stageEl = document.querySelectorAll('.pathway .owl-carousel')[sliderIndex];
      let overallWidth = stageEl.clientWidth;
      let sliderWidth = document.querySelectorAll('.pathway .owl-stage')[sliderIndex].clientWidth;

      // Disable arrows if no scrolling
      if(sliderWidth < overallWidth) {
        stageEl.parentElement.parentElement.querySelectorAll('nav .arrow').forEach(a => {
          a.classList.add('disable');
        });
      }
      
    }, 50);

  }

  slideChange(sliderIndex: number) {

    // Find out if at end/begin based on class of the built in nav we've hidden, 
    // since owl output infuriatingly does not return specifics on this
    
    let stageEl = document.querySelectorAll('.pathway .owl-nav')[sliderIndex];
    let navEl = document.querySelectorAll('.pathway nav')[sliderIndex];
    let next = navEl.querySelector('.arrow.next');
    let prev = navEl.querySelector('.arrow.prev');

    // Slider at end?
    let end = stageEl.querySelector('.owl-next').classList.contains('disabled');
    // Slider at start?
    let start = stageEl.querySelector('.owl-prev').classList.contains('disabled');

    if(!end)
      next.classList.remove('disable');
    else
      next.classList.add('disable');
      
    if(!start)
      prev.classList.remove('disable');
    else
      prev.classList.add('disable');

  }

}
