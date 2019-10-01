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
  public slugNext: string;
  public slugPrev: string;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe((p) => {

      this._dataSvc.getDataForUrl('/api/resource/get/' + p['key']).subscribe((response) => {
        
        this.slugNext = null;
        this.slugPrev = null;

        if(response.next)
          this.slugNext = response.next.slug;
        if(response.prev)
          this.slugPrev = response.prev.slug;

        this.content = response.resource;
        this.hasContent = true;
      
      });
      
    });

  }

}
