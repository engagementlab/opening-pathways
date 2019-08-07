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

    this.tl = new TimelineLite({paused:true, reversed:true});
    let tl = this.tl;

    tl.fromTo(menu, .7, {autoAlpha:0}, {autoAlpha:1, display:'flex', ease:Circ.easeOut});

  }
   
  public openCloseNav() {
    // if(!this.tl.reversed()) {

    //   this.tl.reverse().timeScale(1.3);
      
    //   this.searchField.nativeElement.value = '';
    //   this.searchResults = null;
    // }
    // else
    this.tl.play();

  }

}
