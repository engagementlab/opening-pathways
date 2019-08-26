import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grid-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class GridIconComponent implements OnInit {

  @Input() index: number;
  @Input() color: number;

  constructor() { }

  ngOnInit() {
  }

}
