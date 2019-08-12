import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class NarrativeIndexComponent implements OnInit {

  public hasContent: boolean;
  public narratives: any[];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/narrative/get').subscribe((response) => {
      
      this.narratives = response;
      this.hasContent = true;
      
    });

  }

}
