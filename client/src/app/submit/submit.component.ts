import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  Form
} from '@angular/forms';

import * as _ from 'underscore';
import {
  DataService
} from '../utils/data.service';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  public submitted: boolean;
  public success: boolean;
  public bodyError: boolean;
  public formError: boolean;
  public titleError: boolean;

  public responseForm: FormGroup;

  private formBody: string;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.responseForm = this._formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', Validators.required],
      'title': ['', Validators.required]
    });

  }

  submitForm() {

    this.submitted = true;
    this.bodyError = !this.formBody || this.formBody.length < 1;

    // stop here if form is invalid
    if (this.responseForm.invalid || (!this.formBody || this.formBody.length < 1)) {
      this.formError = true;
      return;
    }

    this.formError = false;

    // Merge body val w/ rest of form and try to submit
    this._dataSvc.sendDataToUrl('/api/narrative/create', _.extend(this.responseForm.value, {
      body: this.formBody
    }))
    .subscribe(response => {
      // Submit success
      this.success = true;
    }, e => {
      if (e.error.code === 11000)
        this.titleError = true;
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.responseForm.controls;
  }

  // Set form body var
  public bodyUpdated(data: any) {
    
    this.formBody = data.html;

  } 

}
