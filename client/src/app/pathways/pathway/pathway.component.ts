import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.scss']
})
export class PathwayComponent implements OnInit {

  public content: any;
  public hasContent: boolean;
  
  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {
    
    this._route.params.subscribe((p) => {
        
      this._dataSvc.getDataForUrl('/api/pathway/get/' + p['id']).subscribe((response) => {
          
        this.content = response;
        this.hasContent = true;

      });

    });

  }

  ngOnInit() {}

}
