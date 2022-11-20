import { Component } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private db: DbService) {}

  avviso: string = '';
  chiave: string ="";
  stato: number = 0;
  teatro_export: any = "";
  teatro: any = {
    platea: [[], []],
    palco: [[], []],
  };

  costruzione_teatro(
    f_platea: number = 7,
    p_platea: number = 10,
    f_palco: number = 4,
    p_palco: number = 6
  ) {
    this.teatro.platea = Array(f_platea)
      .fill('')
      .map(() => Array(p_platea).fill('x'));
    this.teatro.palco = Array(f_palco)
      .fill('')
      .map(() => Array(p_palco).fill('x'));
    console.log(this.teatro);
  }

  //funzione per l'accesso al teatro
  accesso(key: string) {
    //controllo se la stringa key (e il relativo campo) è vuota, popolo il campo in caso di campo vuoto
    if (key != '') {
      console.log('Non sono vuoto!');
      this.db.getDb(key).subscribe({
        next: (res: any) => {
          this.avviso = '';
          // procedo con il prossimo component
          this.stato = 1;
          
          // se la chiave non ha un teatro impostato, lo imposto
          if (res == null) {
            this.teatro = this.costruzione_teatro();
            this.imposta_teatro(key, this.teatro);
            this.accesso(key);
          } else {
            this.chiave = key;
            this.teatro_export = res;
            console.log('io sono res: ' + this.teatro_export);
            console.log('io sono il teatro: ' + this.teatro);
            console.log('tutto ok');
          }
        },
        error: (error) => {
          this.avviso = 'Sembra che la chiave "' + key + '" non esista';
          console.error(
            'Accesso ha generato un errore: ' + JSON.stringify(error)
          );
        },
      });
    } else {
      this.avviso = 'Non hai inserito una chiave!';
    }
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
}
