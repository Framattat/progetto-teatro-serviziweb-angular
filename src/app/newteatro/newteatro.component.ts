import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbService } from '../db.service';
import { NominativoComponent } from '../nominativo/nominativo.component';

@Component({
  selector: 'app-newteatro',
  templateUrl: './newteatro.component.html',
  styleUrls: ['./newteatro.component.css'],
})
export class NewteatroComponent implements OnInit {
  constructor(private db: DbService) {}

  @Input() stato: number;
  @Output() stato_uscita = new EventEmitter<number>();
  @Output() key_uscita = new EventEmitter<string>();

  conf: string[] = ['File Platea', 'Posti Platea', 'File Palco', 'Posti Palco'];
  file: number[] = [2, 3, 4];
  posti: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  teatro_config: number[] = [];
  avviso: string = '';

  valore_selezionato(valore, index) {
    this.teatro_config[index] = +valore.target.value;
  }

  nuovo_teatro() {
    this.db.newDb().subscribe({
      next: (res: any) => {
        var teatro_costruzione = new NominativoComponent(this.db);
        var teatro_temp = teatro_costruzione.costruzione_teatro(
          this.teatro_config
        );
        teatro_costruzione.imposta_teatro(res, teatro_temp);
        this.avviso = '';
        this.stato_uscita.emit(1);
        this.key_uscita.emit(res);
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
