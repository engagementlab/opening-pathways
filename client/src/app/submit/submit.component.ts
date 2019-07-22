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

  private responseForm: FormGroup;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.responseForm = this._formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', Validators.required],
      'title': ['', Validators.required],
      'body': ['', Validators.required]
    });

  }

  submitForm() {

    // this.formError = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.responseForm.invalid)
      return;

    this._dataSvc.sendDataToUrl('/api/narrative/create', this.responseForm.value).subscribe(response => { 
      console.log(response)
    });

  }


  // convenience getter for easy access to form fields
  get f() {
    return this.responseForm.controls;
  }

}
