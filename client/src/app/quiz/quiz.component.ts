import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'underscore';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public hasContent: boolean;
  public quizForm: FormGroup;

  public quizPages: any;
  public quizPageKeys: any[];

  private quizPage: number = 0;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/quiz/get').subscribe((response) => {
      
      let fields = {};

      this.quizPages = response;
      this.quizPageKeys = Object.keys(response);

      // Assemble form fields for validation
      this.quizPageKeys.forEach((p) => {
        this.quizPages[p].forEach((resp, i) => {
          fields[p+'_'+i] = [null, [Validators.required]];
          console.log(_.contains(resp, (r) => {return r.field}))
        });
      });
      this.quizForm = this._formBuilder.group(fields);
      this.quizForm.get('1_0').valueChanges.subscribe(val => {
        console.log(document.getElementById(val).dataset['text'])
      })

      this.hasContent = true;

    });

  }

  public getPage(pg: Number) {

      return this.quizPages[pg+''];

  }

  public nextPage() {

    console.log(this.quizForm.errors)
    console.log(this.quizForm.value)
    if(!this.quizForm.valid) return;
    
    let pages = document.querySelectorAll('.page');
    (pages[this.quizPage] as HTMLElement).classList.remove('active')
    
    this.quizPage++;
    (pages[this.quizPage] as HTMLElement).classList.add('active')


  }

}
