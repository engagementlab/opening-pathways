import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { DataService } from '../utils/data.service';

import * as _ from 'underscore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public hasContent: boolean;
  public formError: boolean;
  public submitError: boolean;
  public lastPage: boolean;
  public quizDone: boolean;

  public quizForm: FormGroup;

  public quizPages: any;
  public quizPageKeys: any[];
  public quizPromptsResponses: object;

  public quizPage: number = 0;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder, private _router: Router) {}

  ngOnInit() {

    // Get all quiz data
    this._dataSvc.getDataForUrl('/api/quiz/get').subscribe((response) => {

      let fields = {};
      this.quizPromptsResponses = {};

      this.quizPages = response;
      this.quizPageKeys = Object.keys(response);

      // Assemble form fields for validation
      this.quizPageKeys.forEach((p) => {
        this.quizPages[p].forEach((resp, i) => {

          this.quizPromptsResponses[p + '_' + i] = { page: p, prompt: resp.prompt, value: null };

          // If first response on page, cache page name
          if(i === 0)
            this.quizPromptsResponses[p + '_' + i].pageName = resp.pageName;

          // Place required on field, or none
          let validators = resp.required ? [null, [Validators.required]] : [null];

          if (resp.type === 'choice') {
            
            // Array for checkboxes, if any
            let chkGroup = [];
            
            
            // No validators for text fields
            _.each(resp.responsesObj, (res, fi) => {
              
              if(res.field)
                fields[p + '_' + i + '_' + fi + '_txt'] = [null];
              if(resp.checkboxes)
                chkGroup.push(new FormControl(false));
            });
            
            // Make array of any checkboxes
            if(resp.checkboxes)
              fields[p + '_' + i] = new FormArray(chkGroup);
            else {

              fields[p + '_' + i] = validators;
            }

          }
          else
            fields[p + '_' + i] = validators;        

        });
      });

      this.quizForm = this._formBuilder.group(fields);

      Object.keys(this.quizForm.controls).forEach(index => {

        let ctrl = this.quizForm.get(index);
        // TODO: needed?
        // Watch all control changes for checkboxes
/*         if(ctrl['controls']) {
          ctrl.valueChanges.subscribe(boxes => {
            
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

          // Now add validator to text entry if corresponding option picked
          if (document.getElementById(index + '_' + prompt + '_txt')) {
            const txtCtrl = this.quizForm.get(index + '_' + prompt + '_txt');
            txtCtrl.setValidators([Validators.required, Validators.minLength(2)]);
            txtCtrl.updateValueAndValidity();
          }
          });
        } */

        if(ctrl['controls']) return;
        // Watch all control changes for non-arrays (checkboxes)
        ctrl.valueChanges.subscribe(prompt => {

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

          // Now add validator to text entry if corresponding option picked
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

  private recordResponses() {

    _.each(this.quizForm.value, (val, id) => {
      
      if(val !== null) {

        let key = id.substring(0, 3);
        let elQuery = 'label[for="'+ id + '_' + val +'"]';

        // If value is array, get all selected checkboxes and cache response strings
        if(_.isArray(val)) {
        
          // Cached val is an array
          this.quizPromptsResponses[key].value = [];

          // Cache all selected checkbox txt
          val.forEach((r, i) => {

            // Only selected ones
            if(!r) return;

            let query = 'label[for="'+ id + '_' + i +'"]';
            let selector = document.querySelector(query + ' .choice');
            
            // Add response content
            let response = selector.textContent;

            // Append fill in response, if any found and not empty
            let fillInField = selector.parentNode.querySelector('input[type="text"]') as HTMLInputElement;
            if(fillInField && fillInField.value.length > 0)
              response = '<i>(' + response + ')</i> ' + fillInField.value;

            this.quizPromptsResponses[key].value.push(response);
        
          });

        }
        else {

          // Check for multiple choice response, and if null query potential text area entry
          let resContent = document.querySelector(elQuery + ' .choice');
          if(!resContent)
            resContent = document.querySelector('textarea[id="' + id + '_0"]');

          if(resContent) {

            let response = resContent.textContent || val;
      
            // Append fill in response, if any found
            let fillInField = resContent.parentNode.querySelector('input[type="text"]') as HTMLInputElement;
            if(fillInField)
              response = '<i>(' + response + ')</i> ' + fillInField.value;

            if(this.quizPromptsResponses[key])
              this.quizPromptsResponses[key].value = response;
          
          }
          else {

            if(document.getElementById(id + '_0')) {
              let response = document.getElementById(id + '_0').textContent;
              this.quizPromptsResponses[key].value = response;
            }

          }

        }
      }
    
    });

  }

  public getPage(pg: Number) {

    return this.quizPages[pg + ''];

  }

  public nextPage() {
    
    this.recordResponses();

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
    
    this.recordResponses();

    let pageFinished = this.formCheck();
    if (!pageFinished) return;

    // For each page, if all responses are empty, remove page entirely
    this.quizPageKeys.forEach((p) => {

      // If no responses for this page, remove page from responses object
      let pagePrompts = _.where(this.quizPromptsResponses, {page: p});
      let pageEmpty = _.every(pagePrompts, (prompt) => { return prompt.value === null });

      // Remove all this page's prompts from results
      if(pageEmpty)
        this.quizPromptsResponses = _.reject(this.quizPromptsResponses, (prompt) => { return prompt.page == p; });
    
    });

    // Send all results as array to data observer and backend, and redirect to results
    this._dataSvc.quizResults = _.values(this.quizPromptsResponses);
    
    this._dataSvc.sendDataToUrl('/api/quiz/save', this._dataSvc.quizResults)
    .subscribe(response => {
      // Submit success
      this._router.navigateByUrl('/quiz/results/' + response.result);
    }, e => {
      this.submitError = true;
    });
    
  }

}
