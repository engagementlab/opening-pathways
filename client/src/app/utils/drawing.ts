import * as SVG from 'svg.js';
import * as _ from 'underscore';

export class Drawing {

    constructor() { }

    /* 
      Draw pathway slider SVG lines
    */
    public pathways(index) {
        
      let stage = document.querySelectorAll('.pathway .owl-stage')[index];
      let names = stage.querySelectorAll('.slide-item svg');

      let offset = document.querySelector('.slide-item svg').clientWidth/2;
      let parentRect = stage.getBoundingClientRect();
      let parentX = parentRect['x'];
      let parentY = parentRect['y'];
      
      // Create a dynamic svg stage under slider stage
      let svgParent = document.createElement('div');
      svgParent.setAttribute('id', 'svg-bg-' + index);
      svgParent.setAttribute('style', 'position:absolute');

      stage.prepend(svgParent);

      let draw = SVG('svg-bg-' + index).size(parentRect['width'], parentRect['height']);

      names.forEach((name, n) => {
        
        // Draw line to right-most sibling item, if there is one
        if (names[n + 1] === undefined) return;

        let x = (name.getBoundingClientRect()['x'] - parentX);
        let y = (name.getBoundingClientRect()['y'] - parentY) + offset;
        let endX = (names[n + 1].getBoundingClientRect()['x'] - parentX);

        let hLine = draw.line(x, y, endX, y);
        hLine.stroke({
          color: '#ddd',
          width: 1,
          linecap: 'round'
        });

      });
    }

    // Generate and shuffle color indices
    public shapeColors(length: Number) {

        let colorIndices = [];

        _.times(length, (i) => {
            colorIndices.push(i);
        });
        
        return _.shuffle(colorIndices);

    }
}
