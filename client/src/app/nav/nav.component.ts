import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TimelineLite, Circ } from 'gsap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  private tl: TimelineLite; 

  constructor() { }

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
