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

  public textContent: string[];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    
    this._dataSvc.getDataForUrl('/api/narrative/get').subscribe((response) => {
      
      this.textContent = response.txt;
      this.narratives = response.content;

      this.hasContent = true;
      
    });

  }

}
