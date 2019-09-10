import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-narrative',
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent implements OnInit {

 
  public hasContent: boolean;
  public narrative: any;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe((p) => {

      this._dataSvc.getDataForUrl('/api/narrative/get/' + p['id']).subscribe((response) => {
        
      this.narrative = response;
      this.hasContent = true;
      
    });
    
  });
  }

}
