import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'quiz-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() formCtrlName: string;
  @Input() formCtrlNameText: string;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
