import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import { OwlOptions } from 'ngx-owl-carousel-o';

import * as SVG from 'svg.js';
import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.scss']
})
export class HomePatientComponent implements OnInit {

  public intro: any;
  public pathways: any[];
  public hasContent: boolean;

  // TEMP
  public names: string[] = ['Emerson Roberson','Clementine Boyer','Blaine Soto','Madeline Wilkins','Daquan Mann','Wylie Wiggins','Camden Myers','Mari Hopkins','Jasper Short','Shana Bullock','Steel Reilly'];

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

    this._dataSvc.getDataForUrl('/api/data/get/home-patient').subscribe((intro) => {

      this.intro = intro[0];
      
      this._dataSvc.getDataForUrl('/api/pathway/all').subscribe((response) => {
        
        this.pathways = response;
        this.hasContent = true;
        
      });
    });

  }

  sliderInit(sliderIndex: number) {

    // Draw SVG lines between all story names
    setTimeout(() => {

      let stage = document.querySelectorAll('.pathway .owl-stage')[sliderIndex];
      let names = stage.querySelectorAll('.item svg');

      let parentRect = stage.getBoundingClientRect();
      let parentX = parentRect['x'];
      let parentY = parentRect['y'];
      
      // Create a dynamic svg stage under slider stage
      let svgParent = document.createElement('div');
      svgParent.setAttribute('id', 'svg-bg-' + sliderIndex);
      svgParent.setAttribute('style', 'position:absolute');

      stage.prepend(svgParent);

      let draw = SVG('svg-bg-' + sliderIndex).size(parentRect['width'], parentRect['height']);

      names.forEach((name, n) => {

        if (names[n + 1] === undefined) return;

        let x = (name.getBoundingClientRect()['x'] - parentX);
        let y = (name.getBoundingClientRect()['y'] - parentY) + 30;
        let endX = (names[n + 1].getBoundingClientRect()['x'] - parentX);

        let hLine = draw.line(x, y, endX, y);
        hLine.stroke({
          color: '#ddd',
          width: 1,
          linecap: 'round'
        });

      });
    
    }, 50);

  }

}
