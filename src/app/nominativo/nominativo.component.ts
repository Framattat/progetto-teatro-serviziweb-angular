import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../db.service';
@Component({
  selector: 'app-nominativo',
  templateUrl: './nominativo.component.html',
  styleUrls: ['./nominativo.component.css'],
})
export class NominativoComponent implements OnInit {
  constructor(private db: DbService) {}
  @Input() key: string;
  @Input() nominativo_teatro: string;
  @Input() posto: string;
  avviso: string;
  stato: number = 1;
  teatro_export: string;
  teatro: any = {
    platea: [[], []],
    palco: [[], []],
  };

  costruzione_teatro(costruzione: number[] = [7, 10, 4, 6]) {
    var teatro_temp;
    this.teatro.platea = Array(costruzione[0])
      .fill('')
      .map(() => Array(costruzione[1]).fill('x'));
    this.teatro.palco = Array(costruzione[2])
      .fill('')
      .map(() => Array(costruzione[3]).fill('x'));
    return (teatro_temp = this.teatro);
  }

  //funzione per l'accesso al teatro
  controllo_accesso(nome: string) {
    if (nome == '') {
      return (this.avviso = 'Non hai inserito il nome!');
    }
    this.db.getDb(this.key).subscribe({
      next: (res: any) => {
        // se la chiave non ha un teatro impostato, lo imposto
        if (res == null) {
          this.costruzione_teatro();
          this.imposta_teatro(this.key, this.teatro);
          return this.controllo_accesso(nome);
        }
        this.teatro_export = res;
        this.nominativo_teatro = nome;
        // resetto l'avviso
        this.avviso = '';
        // procedo con il prossimo component
        this.stato = 2;
      },
      error: (error) => {
        console.error(
          'Controllo accesso ha generato un errore: ' + JSON.stringify(error)
        );
      },
    });
  }
  // funzione per impostare il teatro in base al teatro scelto, se il campo non viene specificato si usa il teatro base
  imposta_teatro(key: string, teatro) {
    this.db.setDb(key, teatro).subscribe({
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

  ngOnInit() {}
}
