import { Component } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private db: DbService) {}

  accesso(key: string) {
    if (key != '') {
      console.log('Non sono vuoto!');
      this.db.getDb(key).subscribe({
        next: (res: any) => {
          if (res == null) {
            console.log(res);
            this.imposta_teatro(key);
            return;
          } else {
            console.log(res);
          }
        },
        error: (error) => {
          console.error(
            'Accesso ha generato un errore: ' + JSON.stringify(error)
          );
        },
      });
    } else {
      console.log('non hai inserito una chiave');
    }
  }

  imposta_teatro(key: string) {
    this.db.setDb(key, 'Ora sono settato').subscribe({
      next: (res: any) => {
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
