import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isQABuild: boolean;
  public pageBleed: boolean;

  title = 'Opening Pathways';

  constructor(private _router: Router, private _titleSvc: Title, private _active: ActivatedRoute) { 
    
    this.isQABuild = environment.qa;
    this._titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);
    
  }

  ngOnInit() {

    this._router.events.subscribe((evt) => {

      if (!(evt instanceof NavigationEnd))
        return;

      this.pageBleed = this._active.root.firstChild.snapshot.data['bleed'] !== undefined;

      // Always go to top of page
      window.scrollTo(0, 0);
      
    });

  }
}
