import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TimelineLite, Circ } from 'gsap';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  public partnerSiteActive: boolean;
  private tlOpen: TimelineLite; 
  private tlClose: TimelineLite; 

  private opened: boolean;

  constructor(private _router: Router) {
  
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      // Close menu when nav starts
      this.tlClose.play();
    });

    this.partnerSiteActive = environment.partner;
  
   }

  ngOnInit() {
  }

  ngAfterViewInit() {

    let menu = document.getElementById('menu');
    let menuBtn = document.getElementById('menu-btn');

    this.tlOpen = new TimelineLite({paused:true});
    this.tlClose = new TimelineLite({paused:true});

    let tl = this.tlOpen;

    tl.set(menuBtn, {className:'+=open'});
    tl.to(menu, .7, {autoAlpha:1, display:'flex', ease:Circ.easeOut});
    tl.fromTo(document.getElementById('menu-overlay'), .5, {autoAlpha:0, display:'none'}, {autoAlpha:1, display:'block'}, '-=.7');
    
    this.tlClose.to(menu, .4, {autoAlpha:0, display:'none', ease:Circ.easeOut});
    this.tlClose.fromTo(document.getElementById('menu-overlay'), .4, {autoAlpha:1, display:'block'}, {autoAlpha:0, display:'none'}, '+=.01');
    this.tlClose.set(menuBtn, {className:'-=open'});

  }
   
  public openCloseNav() {
    
    if(this.opened)
      this.tlClose.restart().play();
    else
      this.tlOpen.restart().play();

    this.opened = !this.opened;

  }

}
