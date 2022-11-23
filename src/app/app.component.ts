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
    //se l'utente non ha inserito la key, lo avviso e non prosegue
    if (key == '') {
      return (this.avviso = 'Non hai inserito una chiave!');
    }
    this.db.getDb(key).subscribe({
      next: () => {
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
  }

  aggiorna_valore(valore) {
    typeof valore == 'string' ? (this.key = valore) : (this.stato = valore);
  }
}
