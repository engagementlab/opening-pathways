import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class QuizResultsComponent implements OnInit {

  public content: any;
  public hasContent: boolean;

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
            
            });

        });

      }
  }


}
