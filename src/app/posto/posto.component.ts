import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { NominativoComponent } from '../nominativo/nominativo.component';

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
  posto: string = '';
  stato: number = 2;
  avviso: string = '';
  constructor(private db: DbService) {}

  prenotazione_posto(fila: number, posto: number, zona: string) {
    var zona_teatro =
      zona == 'platea'
        ? this.teatro.platea[fila][posto]
        : this.teatro.palco[fila][posto];
    if (zona_teatro == 'x') {
      zona == 'platea'
        ? (this.teatro.platea[fila][posto] = this.nominativo_teatro)
        : (this.teatro.palco[fila][posto] = this.nominativo_teatro);
    } else {
      this.avviso = 'Posto occupato da: ' + zona_teatro;
      return;
    }
    var teatro_aggiornato = new NominativoComponent(this.db);
    teatro_aggiornato.imposta_teatro(this.key, this.teatro);
    this.posto = 'nella zona ' + zona + ' n. P' + (fila + 1) + posto;
    this.stato = 1;
    this.avviso = '';
  }
  ngOnInit() {
    this.teatro = JSON.parse(this.teatro_export);
  }
}
