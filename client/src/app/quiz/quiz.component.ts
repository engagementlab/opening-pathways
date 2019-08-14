import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

import * as _ from 'underscore';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public hasContent: boolean;
  public formError: boolean;
  public lastPage: boolean;
  public quizDone: boolean;

  public quizForm: FormGroup;

  public quizPages: any;
  public quizPageKeys: any[];

  public quizPage: number = 0;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/quiz/get').subscribe((response) => {

      let fields = {};

      this.quizPages = response;
      this.quizPageKeys = Object.keys(response);

      // Assemble form fields for validation
      this.quizPageKeys.forEach((p) => {
        this.quizPages[p].forEach((resp, i) => {

          if (resp.type === 'choice') {
            fields[p + '_' + i] = [null, [Validators.required]];

            _.each(resp.responsesObj, (txt, fi) => {
              fields[p + '_' + i + '_' + fi + '_txt'] = [null];
            });
          } else {
            fields[p + '_' + i] = [null, [Validators.required]];
          }

        });
      });

      this.quizForm = this._formBuilder.group(fields);

      Object.keys(this.quizForm.controls).forEach(index => {

        this.quizForm.get(index).valueChanges.subscribe(prompt => {

          // Clear all txt field validators first
          let txtFields = document.querySelectorAll('#responses_' + index + ' .txt')
          _.each(txtFields, (e, i) => {
            const txtCtrl = this.quizForm.get(e.id);

            if (txtCtrl && txtCtrl.validator) {
              document.getElementById('error_' + e.id).style.display = 'none';
              txtCtrl.setValidators(null);
              txtCtrl.updateValueAndValidity();
            }

          });

          // Now add validator if corresponding option picked
          if (document.getElementById(index + '_' + prompt + '_txt')) {
            const txtCtrl = this.quizForm.get(index + '_' + prompt + '_txt');
            txtCtrl.setValidators([Validators.required, Validators.minLength(2)]);
            txtCtrl.updateValueAndValidity();
          }
        });
      });

      this.hasContent = true;

    });

  }

  private formCheck() {

    // Get only field vals for this page
    let pageFields = _.pick(this.quizForm.value, (v, key) => {
      return key.indexOf(this.quizPage + 1) === 0 && this.quizForm.get(key).status === 'INVALID';
    })
    let pageFinished = _.every(pageFields, (v) => {
      return v !== null
    });

    // Hide errors
    _.each(document.querySelectorAll('.error'), (e) => {
      e.style.display = 'none'
    });

    // If page not done, flag errored fields
    if (!pageFinished) {
      Object.keys(pageFields).forEach(key => {
        (document.getElementById('error_' + key) as HTMLElement).style.display = 'block'
      });
      this.formError = true;
    }

    return pageFinished;

  }

  public getPage(pg: Number) {

    return this.quizPages[pg + ''];

  }

  public nextPage() {

    let pageFinished = this.formCheck();
    if (!pageFinished) return;
    
    this.formError = false;

    let pages = document.querySelectorAll('.page');
    (pages[this.quizPage] as HTMLElement).classList.remove('active')

    this.quizPage++;
    (pages[this.quizPage] as HTMLElement).classList.add('active')

    this.lastPage = this.quizPage === pages.length-1;

    // Scroll up
    window.scrollTo(0, 0);

  }

  public submitQuiz() {
    
    let pageFinished = this.formCheck();
    if (!pageFinished) return;

    this.quizDone = true;
    
    // this._dataSvc.sendDataToUrl('/api/quiz/create', this.quizForm.value).subscribe(response => { 
    //   console.log(response);
    // });

  }
  
  public exportPdf() {

    let doc = new jsPDF();
    let dt = Date.now();
    doc.text(this.quizForm.value);
    doc.save('results_' + dt + '.pdf');

  }

}
