import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isQABuild: boolean;

  title = 'Opening Ppathways';

  constructor(private _titleSvc: Title) { 
    
    this.isQABuild = environment.qa;
    this._titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);
    
  }
}
