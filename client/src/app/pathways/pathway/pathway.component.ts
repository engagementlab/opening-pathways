import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.scss']
})
export class PathwayComponent implements OnInit {

  public names: string[] = ['Emerson Roberson','Clementine Boyer','Blaine Soto','Madeline Wilkins','Daquan Mann','Wylie Wiggins','Camden Myers','Mari Hopkins','Jasper Short','Shana Bullock','Steel Reilly','Steel Reilly'];
  constructor() { }

  ngOnInit() {}

}
