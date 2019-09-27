import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isQABuild: boolean;
  public pageBleed: boolean;

  private protectRoute: boolean;
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

      // Only prevent reload, etc for some routes
      this.protectRoute = evt.url.indexOf('/quiz/take') === 0 || evt.url.indexOf('/submit') === 0;
      
    });

  }

  // @HostListener allows us to guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.protectRoute;
  }
}
