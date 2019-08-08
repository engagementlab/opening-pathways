import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hasContent: boolean;
  public isPhone: boolean;
  public intro: any[];
  public narratives: any[];

  constructor(private _dataSvc: DataService) {

    this.isPhone = ismobile.phone;

   }

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/data/get/home').subscribe((intro) => {

      this.intro = intro[0];

      this._dataSvc.getDataForUrl('/api/narrative/get').subscribe((response) => {
        
        this.narratives = response;
        this.hasContent = true;
        
      });

    });

  }

}
