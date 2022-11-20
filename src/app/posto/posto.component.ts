import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-posto',
  templateUrl: './posto.component.html',
  styleUrls: ['./posto.component.css'],
})
export class PostoComponent implements OnInit {
  @Input() teatro_export: any;
  teatro: any;
  platea: any;
  palco: any;

  constructor() {}
  ngOnInit() {
    this.teatro = JSON.parse(this.teatro_export);
    this.platea = this.teatro.platea;
    this.palco = this.teatro.palco;
    console.log(this.teatro);
  }
}
