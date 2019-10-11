import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class QuizLandingComponent implements OnInit {

  public textContent: string;

  constructor(private _dataSvc: DataService) { }
  
  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/text/get/quiz-landing-intro').subscribe((response) => {

      this.textContent = response[0].text;

    });
  
  }

}
