import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import * as SVG from 'svg.js';

@Component({
  selector: 'pathway-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class PathwayGridComponent implements OnInit, AfterViewInit {

  @Input() names: string[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {


    let parentRect = document.getElementById('grid').getBoundingClientRect();
    let parentX = parentRect['x'];
    let parentY = parentRect['y'];
      
    let rightCols = document.querySelectorAll('.name svg.odd');
    let leftCols = document.querySelectorAll('.name svg:not(.odd)');

    let draw = SVG('svg-bg').size(parentRect['width'], parentRect['height']);
    rightCols.forEach((element, i) => {

      let siblingRect = leftCols[i].getBoundingClientRect();

      let x = (element.getBoundingClientRect()['x'] - parentX) + 20 ;
      let y = (element.getBoundingClientRect()['y'] - parentY) + 20;
      let startX = (siblingRect['x'] - parentX) + 20 ;
      
      let hLine = draw.line(startX, y, x, y);
      hLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });

      // Now draw diagonal line to sibling below, if there is one
      let drawLeft = i % 2 === 0;
      let siblingBelow = drawLeft ? leftCols[i+1] : rightCols[i+1]
      
      if(siblingBelow) {

        // Decide where line ends based on direction
        let siblingBelowRect = siblingBelow.getBoundingClientRect();

        console.log(drawLeft,siblingBelow)
        
        let startXD = drawLeft ? startX : x; 
        let endXD = !drawLeft ? startX : x; 
        let endY = (siblingBelowRect['y'] - parentY) + 20;
        
        let dLine = draw.line(startXD, y, endXD, endY);
        dLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });
 
      }

    });0

  }

}
