import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-submit-patient',
  templateUrl: './submit-patient.component.html',
  styleUrls: ['./submit-patient.component.scss']
})
export class SubmitPatientComponent implements OnInit {

  public fields: any;
  
  public hasContent: boolean;
  public submitted: boolean;
  public success: boolean;
  public formError: boolean;

  public responseForm: FormGroup;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this._dataSvc.getDataForUrl('/api/story/fields').subscribe((response) => {

      let fields = {
        'firstName': ['', Validators.required],
        'lastName': ['', Validators.required],
        'email': ['', [Validators.required, Validators.email]]
      };
      
      this.fields = response;
      response.forEach((resp, i) => {

        let validators = resp.required ? [null, [Validators.required]] : [null];
        fields[resp['mapping']] = validators;

      });

      this.responseForm = this._formBuilder.group(fields);
      this.hasContent = true;

    });

  }

  private formCheck() {

    // Get only field vals for this page
    let pageFields = _.pick(this.responseForm.value, (v, key) => {
      return this.responseForm.get(key).status === 'INVALID';
    });
    let formFinished = _.every(pageFields, (v) => {
      return v !== null &&  v.length > 0;
    });

    // Hide errors
    _.each(document.querySelectorAll('.error'), (e) => {
      e.style.display = 'none'
    });

    // If page not done, flag errored fields
    if (!formFinished) {
      Object.keys(pageFields).forEach(key => {
        (document.getElementById('error_' + key) as HTMLElement).style.display = 'block'
      });
      this.formError = true;
    }

    return formFinished;

  }

  public submitForm() {
    
    let finished = this.formCheck();
    if (!finished) return;

    let body = this.responseForm.value;
    body['name.first'] = this.responseForm.get('firstName').value;
    body['name.last'] = this.responseForm.get('lastName').value;
    
    // Send form data
    this._dataSvc.sendDataToUrl('/api/story/create', this.responseForm.value).subscribe(response => { 
      this.success = true;
    });

  }

}
