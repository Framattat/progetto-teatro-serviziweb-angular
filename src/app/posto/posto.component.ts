import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-posto',
  templateUrl: './posto.component.html',
  styleUrls: ['./posto.component.css'],
})
export class PostoComponent implements OnInit {
  @Input() teatro_export: any;
  @Input() nominativo_teatro: string;
  @Input() key: string;
  teatro: any;
  platea: any;
  palco: any;
  stato: number = 2;
  avviso: string = '';
  constructor() {}

  test(fila: number, posto: number) {
    if (this.teatro.platea[fila][posto] == 'x') {
      this.teatro.platea[fila][posto] = this.nominativo_teatro;
      this.stato = 1;
    } else {
      this.avviso = 'Posto occupato da: ' + this.nominativo_teatro;
    }
  }

  ngOnInit() {
    this.teatro = JSON.parse(this.teatro_export);
    this.platea = this.teatro.platea;
    this.palco = this.teatro.palco;
    console.log(this.teatro);
  }
}
