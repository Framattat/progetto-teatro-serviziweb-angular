import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../db.service';

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
  constructor(private db: DbService) {}

  prenotazione_posto(fila: number, posto: number, zona) {
    console.log(zona);
    if (
      this.teatro.platea[fila][posto] == 'x' ||
      this.teatro.platea[fila][posto] == this.nominativo_teatro
    ) {
      this.teatro.platea[fila][posto] = this.nominativo_teatro;
      this.aggiorna_teatro(this.teatro);
      this.stato = 1;
      this.avviso = '';
    } else {
      this.avviso = 'Posto occupato da: ' + this.teatro.platea[fila][posto];
    }
  }

  // funzione per impostare il teatro in base al teatro scelto, se il campo non viene specificato si usa il teatro base
  aggiorna_teatro(teatro) {
    this.db.setDb(this.key, teatro).subscribe({
      next: () => {
        console.log('Teatro impostato');
      },
      error: (error) => {
        console.error(
          'Imposta_teatro ha generato un errore: ' + JSON.stringify(error)
        );
      },
    });
  }

  ngOnInit() {
    this.teatro = JSON.parse(this.teatro_export);
    this.platea = this.teatro.platea;
    this.palco = this.teatro.palco;
    console.log(this.teatro);
  }
}
