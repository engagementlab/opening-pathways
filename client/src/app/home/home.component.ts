import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
