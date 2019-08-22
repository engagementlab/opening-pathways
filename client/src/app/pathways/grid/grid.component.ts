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

    function drawVerts(side) {

      // Draw line from each name element to sibling below, if there is one
      side.forEach((nameEl, i) => {

        if(!side[i+1]) return;
        let bottomColRect = side[i+1].getBoundingClientRect();
        
        let x = (nameEl.getBoundingClientRect()['x'] - parentX) + 20 ;
        let y = (nameEl.getBoundingClientRect()['y'] - parentY) + 20;
        let endY = bottomColRect['y'] - parentY;
        
        let hLine = draw.line(x, y, x, endY);
        hLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });
        
      });

    }

    drawVerts(leftCols);
    drawVerts(rightCols);

    leftCols.forEach((element, i) => {

      if(!rightCols[i]) return;
      let rightColRect = rightCols[i].getBoundingClientRect();

      let x = (element.getBoundingClientRect()['x'] - parentX) + 20 ;
      let y = (element.getBoundingClientRect()['y'] - parentY) + 20;
      let startX = (rightColRect['x'] - parentX) + 20 ;
      
      let hLine = draw.line(startX, y, x, y);
      hLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });

      // Now draw diagonal line to sibling below and to side, if there is one
      let drawRight = i % 2 > 0;
      let siblingBelow = drawRight ? leftCols[i+1] : rightCols[i+1]
      
      if(siblingBelow) {

        // Decide where line ends based on direction
        let siblingBelowRect = siblingBelow.getBoundingClientRect();
        
        let startXD = drawRight ? startX : x; 
        let endXD = !drawRight ? startX : x; 
        let endY = (siblingBelowRect['y'] - parentY) + 20;
        
        let dLine = draw.line(startXD, y, endXD, endY);
        dLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });
 
      }

    });

  }

}
