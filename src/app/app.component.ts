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
  key: string = '';
  stato: number = 0;

  //funzione per l'accesso al teatro
  accesso(key: string) {
    //controllo se la stringa key (e il relativo campo) è vuota, popolo il campo in caso di campo vuoto
    if (key != '') {
      console.log('Non sono vuoto!');
      this.db.getDb(key).subscribe({
        next: (res: any) => {
          // passo la key al prossimo component
          this.key = key;
          // resetto l'avviso
          this.avviso = '';
          // procedo con il prossimo component
          this.stato = 1;
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
}
