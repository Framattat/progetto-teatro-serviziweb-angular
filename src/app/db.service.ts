import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//injectable -> quindi sto sviluppando un service
@Injectable({
  providedIn: 'root',
})
export class dbService {
  // definisco la URL per la connessione al db
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';

  // rendo disponibile i metodi
  constructor(private http: HttpClient) {}

  public getDb(key: string): Observable<string> {
    console.log('la get' + key);
    //metodo get endpoint get
    return this.http.get<string>(this.URL + 'get?key=' + key);
  }
  public setDb(key: string, body): Observable<string> {
    console.log('la set' + key);
    //il metodo della set è post, fornisco anche body
    return this.http.post<string>(this.URL + 'set?key=' + key, body);
  }
  public newDb(): Observable<string> {
    console.log('la new');
    //metodo della new è get, con il secret fornito dal professore e l'endpoint new
    return this.http.get<string>(this.URL + 'new?secret=ssw2022');
  }
}
