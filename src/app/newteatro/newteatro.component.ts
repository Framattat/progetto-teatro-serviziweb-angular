import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { NominativoComponent } from '../nominativo/nominativo.component';

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
  stato: number = 0;
  avviso: string = '';

  valore_selezionato(valore, config) {
    switch (config) {
      case 'f_pl': {
        this.teatro_config[0] = +valore.target.value;
        break;
      }
      case 'p_pl': {
        this.teatro_config[1] = +valore.target.value;
        break;
      }
      case 'f_pa': {
        this.teatro_config[2] = +valore.target.value;
        break;
      }
      case 'p_pa': {
        this.teatro_config[3] = +valore.target.value;
        break;
      }
      default:
        console.log('Valore anomalo');
    }
  }

  nuovo_teatro() {
    this.db.newDb().subscribe({
      next: (res: any) => {
        console.log(this.teatro_config);
        var teatro_costruzione = new NominativoComponent(this.db);
        var teatro_temp = teatro_costruzione.costruzione_teatro(
          this.teatro_config[0],
          this.teatro_config[1],
          this.teatro_config[2],
          this.teatro_config[3]
        );
        teatro_costruzione.imposta_teatro(res, teatro_temp);
        this.avviso = '';
        //this.stato = 1;
        console.log(res, teatro_temp);
      },
      error: (error) => {
        this.avviso =
          'Non sono riuscito a generare il teatro, qualcosa è andato storto';
        console.error(
          'Nuovo_teatro ha generato un errore: ' + JSON.stringify(error)
        );
      },
    });
  }
  ngOnInit() {}
}
