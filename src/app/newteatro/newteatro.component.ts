import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-newteatro',
  templateUrl: './newteatro.component.html',
  styleUrls: ['./newteatro.component.css'],
})
export class NewteatroComponent implements OnInit {
  constructor(private db: DbService) {}

  file: number[] = [2, 3, 4];
  posti: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  teatro_config: number[] = [];

  valore_selezionato(valore, config) {
    switch (config) {
      case 'f_pl': {
        this.teatro_config[0] = valore.target.value;
        break;
      }
      case 'p_pl': {
        this.teatro_config[1] = valore.target.value;
        break;
      }
      case 'f_pa': {
        this.teatro_config[2] = valore.target.value;
        break;
      }
      case 'p_pa': {
        this.teatro_config[3] = valore.target.value;
        break;
      }
      default:
        console.log('Valore anomalo');
    }
  }

  nuovo_teatro() {
    console.log(this.teatro_config);
  }
  ngOnInit() {}
}
