import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//injectable -> quindi sto sviluppando un service
@Injectable({
  providedIn: 'root',
})
export class DbService {
  // definisco la URL per la connessione al db
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';

  // rendo disponibile i metodi della classe httpclient
  constructor(private http: HttpClient) {}

  public getDb(key: string): Observable<string> {
    console.log('endpoint get, chiave: ' + key);
    //metodo get endpoint get
    // specifico get<string> perché è un metodo overloaded mi restituisce diversi tipi di risultati
    console.log(this.http.get<string>(this.URL + 'get?key=' + key));
    return this.http.get<string>(this.URL + 'get?key=' + key);
  }
  public setDb(key: string, body): Observable<string> {
    console.log('endpoint set, chiave: ' + key);
    //il metodo della set è post, fornisco anche body, endpoint set
    return this.http.post<string>(this.URL + 'set?key=' + key, body);
  }
  public newDb(): Observable<string> {
    console.log('endpoint new');
    //metodo della new è get, con il secret fornito dal professore e l'endpoint new
    return this.http.get<string>(this.URL + 'new?secret=ssw2022');
  }
}
