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

import { CanDeactivateGuard } from '../utils/deactivate/can-deactivate.guard';
import {
  DataService
} from '../utils/data.service';

import * as _ from 'underscore';
import { FormCanDeactivate } from '../utils/deactivate/form-can-deactivate';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent extends FormCanDeactivate implements OnInit {
  
  public hasContent: boolean;
  public submitted: boolean;
  public success: boolean;
  public bodyError: boolean;
  public formError: boolean;
  public titleError: boolean;

  public responseForm: FormGroup;

  public textContent: any[];
  private formBody: string;

  // Can leave form?
  canLeave: boolean;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {

    super();

  }

  ngOnInit() {

    // Can leave until entry begins
    this.canLeave = true;

    this.responseForm = this._formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', Validators.required],
      'title': ['', Validators.required]
    });

    this._dataSvc.getDataForUrl('/api/text/get/submit-narrative,submit-narrative-thanks').subscribe((response) => {
  
      this.textContent = response;
      this.hasContent = true;
      
    });

    // Can't leave once changes begin
    this.responseForm.statusChanges.subscribe(o => {
      this.canLeave = false;
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

    // Allow leave
    this.canLeave = true;

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
