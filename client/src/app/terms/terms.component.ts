import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

 
  public tos:boolean;
  public hasContent: boolean;
  
  public content: any;

  constructor(private _dataSvc: DataService, private _active: ActivatedRoute) { }

  ngOnInit() {

    this.tos = this._active.root.firstChild.snapshot.data['tos'];

    let key = (this.tos ? 'tos' : 'privacy');
    let url = '/api/data/get/' + key;

    this._dataSvc.getDataForUrl(url).subscribe((content) => {
      
      this.content = content[0][key].html;
      this.hasContent = true;

    });

  }
}
