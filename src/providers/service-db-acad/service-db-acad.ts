import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../../types/types';
import { Observable } from 'rxjs/Observable';
import { Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ServiceDbAcadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceDbAcadProvider {

  constructor(public http: HttpClient) {}

  server : string = "http://localhost:3000";

  //#region Utenti
  GetUtenti():Observable<Utente[]>{
    return this.http
      .get(this.server + "/ListUtenti")
      .map(res => res as Utente[]  );
  }

  AddUtente(utente:Utente):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Nome', utente.Nome)
      .set('Cognome', utente.Cognome)
      .set('Email', utente.Email);
    const options = {
        headers,
        params
      };
    return this.http.put(this.server + "/AddUtente", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  //#endregion

  //#region MetodiGenerali
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  //#endregion
}