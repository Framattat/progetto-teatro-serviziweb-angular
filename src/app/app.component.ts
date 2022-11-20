import { Component } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private db: DbService) {}

  teatro: string = ' ';
  avviso: string = '';
  stato: number = 0;

  accesso(key: string) {
    if (key != '') {
      console.log('Non sono vuoto!');
      this.db.getDb(key).subscribe({
        next: (res: any) => {
          this.avviso = '';
          this.stato = 1;
          if (res == null) {
            console.log(res);
            this.imposta_teatro(key);
          } else {
            console.log(res);
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
      console.log('non hai inserito una chiave');
    }
  }

  imposta_teatro(key: string) {
    this.db.setDb(key, this.teatro).subscribe({
      next: () => {
        this.accesso(key);
        return;
      },
      error: (error) => {
        console.error(
          'Imposta_teatro ha generato un errore: ' + JSON.stringify(error)
        );
      },
    });
  }
}
