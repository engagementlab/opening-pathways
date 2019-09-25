import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/utils/data.service';

import { TweenLite } from 'gsap';

import * as printJS from 'print-js';
import * as ClipboardJS from 'clipboard';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class QuizResultsComponent implements OnInit {

  public content: any;
  public hasContent: boolean;
  public url: string;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }
  
  ngOnInit() {
    
      // First checked for cached results, otherwise fetch by ID
      if(this._dataSvc.quizResults) {
    
        this.content = this._dataSvc.quizResults;
        this.hasContent = true;
    
      }
      else {

        this._route.params.subscribe((p) => {
      
          this._dataSvc.getDataForUrl('/api/quiz/get/results/' + p['key']).subscribe((res) => {
    
            this.content = res.responses;
            this.hasContent = true;

            this.url = window.location.href;

            });

        });

      }

      let urlTxt = new ClipboardJS('#url');
      urlTxt.on('success', function(e) {
        TweenLite.fromTo('#url', 1.5, {autoAlpha:0}, {autoAlpha:1});
        e.clearSelection();
      });
  
  }

  public printResults() {

    // Generate printable page
    printJS({
      printable: 'results',
      type: 'html',
      header: 'Opening Pathways - Partner Quiz', 
      documentTitle: 'Opening Pathways - Quiz Results',

      headerStyle: 'font-size: 2em',
      ignoreElements: ['header', 'btn'],
      css: 'https://res.cloudinary.com/engagement-lab-home/raw/upload/v1568148486/opening-pathways/printable.css'
    });

  }

}
