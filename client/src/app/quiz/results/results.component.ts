import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class QuizResultsComponent implements OnInit {

  public content: any;
  public hasContent: boolean;

  constructor(private _dataSvc: DataService) {

    this.content = _dataSvc.quizResults;

  }

  ngOnInit() {
  }

}
