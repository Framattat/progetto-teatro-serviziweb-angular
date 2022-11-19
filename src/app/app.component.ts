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
      if (this.db.getDb(key) != null) {
        this.db.getDb(key).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (error) => {
            console.error(
              'Accesso ha generato un errore: ' + JSON.stringify(error)
            );
          },
        });
      } else {
        console.log('chiave non settata');
      }
    } else {
      console.log('non hai inserito una chiave');
    }
  }
}
