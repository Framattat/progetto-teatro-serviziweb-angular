import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-posto',
  templateUrl: './posto.component.html',
  styleUrls: ['./posto.component.css'],
})
export class PostoComponent implements OnInit {
  @Input() teatro_export: any;

  constructor() {}

  ngOnInit() {}
}
