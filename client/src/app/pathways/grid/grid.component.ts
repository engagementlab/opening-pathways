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
      
    let rightCols = document.querySelectorAll('.name .bg.right svg'); 
    let midCols = document.querySelectorAll('.name .bg:not(.left):not(.right) svg');
    let leftCols = document.querySelectorAll('.name .bg.left svg');

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
    drawVerts(midCols);
    drawVerts(rightCols);

    /* leftCols.forEach((element, i) => {

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

    }); */

    function drawDiagonal(side) {

      
      side.forEach((element, i) => {
        console.log(midCols[i+1])

        // Get middle column element at next row, if exists

      if(!midCols[i+1]) return;
      let midColRect = midCols[i+1].getBoundingClientRect();

      let x = (element.getBoundingClientRect()['x'] - parentX) + 20 ;
      let y = (element.getBoundingClientRect()['y'] - parentY) + 20;
      let endX = (midColRect['x'] - parentX) + 20 ;
      let endY = (midColRect['y'] - parentY) + 20 ;
      
      // Now draw diagonal line to sibling below and to side, if there is one
      let hLine = draw.line(x, y, endX, endY);
      hLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });

      });
    }

    midCols.forEach((element, i) => {

      if(!leftCols[i] && !rightCols[i]) return;
      let rect = element.getBoundingClientRect();
      let leftColRect = leftCols[i].getBoundingClientRect();
      
      let x = (rect['x'] - parentX) + 20 ;
      let y = (rect['y'] - parentY) + 20;

      let endXLeft = (leftColRect['x'] - parentX) + 20 ;
      
      let leftLine = draw.line(x, y, endXLeft, y);
      leftLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });

      if(!rightCols[i]) return;
      
      let rightColRect = rightCols[i].getBoundingClientRect();
      let endXRight = (rightColRect['x'] - parentX) + 20 ;

      let rightLine = draw.line(x, y, endXRight, y);
      rightLine.stroke({ color: '#ddd', width: 1, linecap: 'round' });
      

    });

    drawDiagonal(leftCols);
    drawDiagonal(rightCols);

  }

}
