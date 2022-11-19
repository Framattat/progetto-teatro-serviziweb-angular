import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostoComponent } from './posto/posto.component';
import { NominativoComponent } from './nominativo/nominativo.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PostoComponent, NominativoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
