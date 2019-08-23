import { Component, OnInit, Input } from '@angular/core';

import * as ismobile from 'ismobilejs';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  public isPhone: boolean;
  @Input() tagline: string;
  
  constructor() {
   
    this.isPhone = ismobile.phone;

  }

  ngOnInit() {
  }

}
