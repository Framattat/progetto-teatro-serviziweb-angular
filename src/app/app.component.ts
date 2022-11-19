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
    this.db.getDb(key).subscribe({
      next: (res: any) => {
        document.getElementById('output').innerHTML = 'Ho impostato con la set';
      },
      error: (error) => {
        console.error('Accesso ha generato un errore' + JSON.stringify(error));
      },
    });
  }
}
