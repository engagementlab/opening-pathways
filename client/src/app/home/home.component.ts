import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import { environment } from '../../environments/environment';
import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hasContent: boolean;
  public isPhone: boolean;
  public isPartnerLayout: boolean;
  public intro: any[];
  public narratives: any[];

  constructor(private _dataSvc: DataService) {

    this.isPhone = ismobile.phone;
    this.isPartnerLayout = environment.partner;

  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/data/get/home').subscribe((intro) => {

      this.intro = intro[0];

      this._dataSvc.getDataForUrl('/api/narrative/featured').subscribe((response) => {
        
        this.narratives = response;
        this.hasContent = true;
        
      });

    });

  }

}
