import { Utente, Sessione, Esperimento, Posizione, Orientamento, Stimolo } from './../../types/types';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
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

  GetUtenteByEmail(email : string):Observable<Utente>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetUtente", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
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
    return this.http
      .put(this.server + "/AddUtente", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  //#endregion

  //#region counters
  GetOreEsperimenti(email:string):Observable<number>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/OreEsperimenti", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetNumeroTest(email:string):Observable<number>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/NumeroTest", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetNumeroEsperimenti(email:string):Observable<number>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/NumeroEsperimenti", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetNumeroSessioni(email:string):Observable<number>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/NumeroSessioni", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }
  //#endregion

  //#region sessions
  GetSessioni(email : string):Observable<Sessione[]>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetSessioni", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  AddSessione(sessione : Sessione):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSessione', sessione.CodSessione.toString())
      .set('DataCreazione', sessione.DataCreazione.toString())
      .set('Email', sessione.Email)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/AddSessione", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region experiments
  GetEsperimenti(email : string):Observable<Esperimento[]>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetEsperimenti", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetEsperimentoByNome(nome : string):Observable<Esperimento>{
    if(nome != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('NomeEsperimento', nome);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetEsperimentoByNome", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }


  EditAddEsperimento(exp : Esperimento):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.CodEsperimento.toString())
      .set('NomeEsperimento', exp.NomeEsperimento)
      .set('NumeroBin', exp.NumeroBin.toString())
      .set('DurataBin', exp.DurataBin.toString())
      .set('PrimaScelta', exp.PrimaScelta.toString())
      .set('Latenza', exp.Latenza.toString())
      .set('Transizioni', exp.Transizioni.toString())
      .set('Forma', exp.Forma)
      .set('MostraPosizioni', exp.MostraPosizioni.toString())
      .set('Email', exp.Email)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddEsperimento", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  DeleteEsperimento(CodEsperimento : number):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', CodEsperimento.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .delete(this.server + "/DeleteEsperimento", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region positions
  GetPosizioniByEsperimento(exp : number, email : string):Observable<Posizione[]>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', exp.toString())
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetPosizioniByEsperimento", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddPosizioneToEsperimento(exp : number, email : string, pos : Posizione):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.toString())
      .set('CodPosizione', (pos.CodPosizione==undefined?"0":pos.CodPosizione.toString()))
      .set('NomePosizione', pos.NomePosizione)
      .set('Email', email)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddPosizioneToEsperimento", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region orientation
  GetOrientamentiByEsperimento(exp : number, email : string):Observable<Orientamento[]>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', exp.toString())
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetOrientamentiByEsperimento", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddOrientamentoToEsperimento(exp : number, email : string, orient : Orientamento):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.toString())
      .set('CodOrientamento', orient.CodOrientamento.toString())
      .set('NomeOrientamento', orient.NomeOrientamento)
      .set('Email', email)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddOrientamentoToEsperimento", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region stimuli
  GetStimoliByEsperimento(exp : number, email : string):Observable<Stimolo[]>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', exp.toString())
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetStimoliByEsperimento", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddStimoloToEsperimento(exp : number, email : string, stim : Stimolo):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.toString())
      .set('CodStimolo', stim.CodStimolo.toString())
      .set('NomeStimolo', stim.NomeStimolo)
      .set('Email', email)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddStimoloToEsperimento", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region clear POS
  ClearPOS(CodEsperimento : number):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', CodEsperimento.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .delete(this.server + "/ClearPOS", options)
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
