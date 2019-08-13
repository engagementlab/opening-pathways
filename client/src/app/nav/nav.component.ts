import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TimelineLite, Circ } from 'gsap';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  private tl: TimelineLite; 

  constructor(private _router: Router) {
  
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      // Close menu when nav starts
      this.tl.reverse().timeScale(1.3);
    });
  
   }

  ngOnInit() {
  }

  ngAfterViewInit() {

    let menu = document.getElementById('menu');
    let menuBtn = document.getElementById('menu-btn');

    this.tl = new TimelineLite({paused:true, reversed:true});
    let tl = this.tl;

    tl.set(menuBtn, {className:'+=open'});
    tl.fromTo(menu, .7, {autoAlpha:0, display:'none'}, {autoAlpha:1, display:'flex', ease:Circ.easeOut});
    tl.fromTo(document.getElementById('menu-overlay'), .5, {autoAlpha:0, display:'none'}, {autoAlpha:1, display:'block'}, '-=.7');

  }
   
  public openCloseNav() {
    if(!this.tl.reversed())
      this.tl.reverse().timeScale(1.3);
    else
      this.tl.play();

  }

}
