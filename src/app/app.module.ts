import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostoComponent } from './posto/posto.component';
import { NominativoComponent } from './nominativo/nominativo.component';
import { NewteatroComponent } from './newteatro/newteatro.component';
import { DbService } from './db.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, PostoComponent, NominativoComponent, NewteatroComponent],
  bootstrap: [AppComponent],
  providers: [DbService],
})
export class AppModule {}

// nel modulo configuro moduli, servizi, component etc. come se fosse una libreria
