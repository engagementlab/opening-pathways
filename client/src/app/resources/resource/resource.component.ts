import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  public hasContent: boolean;
  public content: any;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe((p) => {

      this._dataSvc.getDataForUrl('/api/data/get/resource/' + p['key']).subscribe((response) => {
        
        this.content = response[0];
        this.hasContent = true;
      
      });
      
    });

  }

}
