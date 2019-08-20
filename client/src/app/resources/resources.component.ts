import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  public hasContent: boolean;
  public categories: string[];
  public resources: any[];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/data/get/resources').subscribe((response) => {
      
      this.categories = _.uniq(_.map(response[0], (r) => { return r.category.name; } ));
      this.resources = _.groupBy(response[0], (r) => { return r.category.name; } );

      this.hasContent = true;
      
    });

  }
}
