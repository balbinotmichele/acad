import { Utente, Sessione, Esperimento, Posizione, Orientamento, Stimolo, Test, Soggetto, Posizionato, Orientato, Stimolato, Dipendato } from './../../types/types';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { VariabileIndipendente, Bin } from '../../types/types';

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

  GetSessioneByNome(nome: string, email : string):Observable<Sessione>{
    if(email != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('NomeSessione', nome)
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetSessioneByNome", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  AddSessione(sessione : Sessione):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
        // .set('CodSessione', sessione.CodSessione.toString())
      .set('NomeSessione', sessione.NomeSessione)
      .set('DataCreazione', sessione.DataCreazione)
      .set('CodEsperimento', sessione.CodEsperimento.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/AddSessione", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  DeleteSessione(CodSessione : number):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSessione', CodSessione.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .delete(this.server + "/DeleteSessione", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region indie var
  GetVariabiliBySessione(codSessione : number):Observable<VariabileIndipendente[]> {
      if(codSessione != undefined) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        const params = new HttpParams()
          .set('CodSessione', codSessione.toString());
        const options = {
            headers,
            params
          };
        return this.http
          .get(this.server + "/GetVariabiliBySessione", options)
          .map((response: Response) => response)
          .catch(this.handleError);
      }
  }

  AddVariabile(variabile : VariabileIndipendente):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('NomeVariabile', variabile.NomeVariabile)
      .set('TipoVariabile', variabile.TipoVariabile)
      .set('CodSessione', variabile.CodSessione.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/AddVariabile", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region depended
  GetDipendatoByTest(codSessione: number, codSoggetto : number):Observable<Dipendato[]>{
    if(codSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', codSessione.toString())
        .set('CodSoggetto', codSoggetto.toString())
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetDipendatoByTest", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }


  EditAddDipendato(dip : Dipendato):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', dip.CodSoggetto.toString())
      .set('CodSessione', dip.CodSessione.toString())
      .set('CodVariabile', dip.CodVariabile.toString())
      .set('Valore', dip.Valore)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddDipendato", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region tests
  GetTestSessione(CodSessione : number, CodSoggetto:number):Observable<Test>{
    if(CodSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', CodSessione.toString())
        .set('CodSoggetto', CodSoggetto.toString());
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetTestSessione", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetAllTestSessione(CodSessione : number):Observable<Test[]>{
    if(CodSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', CodSessione.toString())
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetAllTestSessione", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddTest(test : Test):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', test.CodSoggetto.toString())
      .set('CodSessione', test.CodSessione.toString())
      .set('DataEsperimento', test.DataEsperimento)
      .set('DataInserimento', test.DataInserimento)
      .set('Latenza', test.Latenza.toString())
      .set('Transizioni', test.Transizioni.toString())
      .set('PrimaScelta', test.PrimaScelta)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddTest", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  DeleteTestSoggetto(test : Test):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', test.CodSoggetto.toString())
      .set('CodSessione', test.CodSessione.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .delete(this.server + "/DeleteTestSoggetto", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region subjects
  GetSoggettiBySessione(codSessione : number):Observable<Soggetto[]>{
    if(codSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', codSessione.toString());
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetSoggettiBySessione", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetSoggettiByUtente(email : string):Observable<Soggetto[]>{
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
        .get(this.server + "/GetSoggettiByUtente", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetSoggettoByNome(nomeSoggetto : string, email : string):Observable<Soggetto>{
    if(nomeSoggetto != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('NomeSoggetto', nomeSoggetto.toString())
        .set('Email', email);
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetSoggettoByNome", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetSoggettiTestati(CodSessione : number):Observable<any[]>{
    if(CodSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', CodSessione.toString());
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetSoggettiTestati", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddSoggetto(sub : Soggetto):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', sub.CodSoggetto.toString())
      .set('NomeSoggetto', sub.NomeSoggetto)
      .set('Descrizione', sub.Descrizione)
      .set('Email', sub.Email)
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddSoggetto", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  DeleteSoggetto(sub : Soggetto):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', sub.CodSoggetto.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .delete(this.server + "/DeleteSoggetto", options)
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

  GetEsperimentiUsati():Observable<Esperimento[]>{
    return this.http
      .get(this.server + "/GetEsperimentiUsati")
      .map(res => res as Esperimento[]  );
  }

  GetEsperimentoByNome(nomeEsperimento : string, email : string):Observable<Esperimento>{
    if(nomeEsperimento != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('NomeEsperimento', nomeEsperimento)
        .set('Email', email);
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

  GetEsperimentoByCodice(codice : number):Observable<Esperimento>{
    if(codice != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', codice.toString());
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetEsperimentoByCodice", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  GetEsperimentoBySessione(CodSessione : number):Observable<Esperimento>{
    if(CodSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', CodSessione.toString());
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetEsperimentoBySessione", options)
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
  GetPosizioniByEsperimento(exp : number):Observable<Posizione[]>{
    if(exp != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', exp.toString())
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

  EditAddPosizioneToEsperimento(exp : number, pos : Posizione):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.toString())
      .set('CodPosizione', (pos.CodPosizione==undefined?"0":pos.CodPosizione.toString()))
      .set('NomePosizione', pos.NomePosizione)
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

  //#region positioned
  GetPosizionatoByTest(codSessione: number, codSoggetto : number):Observable<Posizionato[]>{
    if(codSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', codSessione.toString())
        .set('CodSoggetto', codSoggetto.toString())
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetPosizionatoByTest", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddPosizionato(pos : Posizionato):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', pos.CodSoggetto.toString())
      .set('CodSessione', pos.CodSessione.toString())
      .set('CodPosizione', pos.CodPosizione.toString())
      .set('Tempo', pos.Tempo.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddPosizionato", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region orientation
  GetOrientamentiByEsperimento(exp : number):Observable<Orientamento[]>{
    if(exp != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', exp.toString())
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

  EditAddOrientamentoToEsperimento(exp : number, orient : Orientamento):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.toString())
      .set('CodOrientamento', orient.CodOrientamento.toString())
      .set('NomeOrientamento', orient.NomeOrientamento)
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

  //#region oriented
  GetOrientatoByTest(codSessione: number, codSoggetto : number):Observable<Orientato[]>{
    if(codSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', codSessione.toString())
        .set('CodSoggetto', codSoggetto.toString())
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetOrientatoByTest", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddOrientato(ori : Orientato):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', ori.CodSoggetto.toString())
      .set('CodSessione', ori.CodSessione.toString())
      .set('CodOrientamento', ori.CodOrientamento.toString())
      .set('Tempo', ori.Tempo.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddOrientato", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region stimuli
  GetStimoliByEsperimento(exp : number):Observable<Stimolo[]>{
    if(exp != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodEsperimento', exp.toString())
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

  EditAddStimoloToEsperimento(exp : number, stim : Stimolo):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodEsperimento', exp.toString())
      .set('CodStimolo', stim.CodStimolo.toString())
      .set('NomeStimolo', stim.NomeStimolo)
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

  //#region stimulated
  GetStimolatoByTest(codSessione: number, codSoggetto : number):Observable<Stimolato[]>{
    if(codSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', codSessione.toString())
        .set('CodSoggetto', codSoggetto.toString())
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetStimolatoByTest", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddStimolato(stim : Stimolato):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', stim.CodSoggetto.toString())
      .set('CodSessione', stim.CodSessione.toString())
      .set('CodPosizione', stim.CodPosizione.toString())
      .set('CodStimolo', stim.CodStimolo.toString())
      .set('Tempo', stim.Tempo.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddStimolato", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region bins
  GetBinByTest(codSessione: number, CodSoggetto : number):Observable<Bin[]>{
    if(codSessione != undefined) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('CodSessione', codSessione.toString())
        .set('CodSoggetto', CodSoggetto.toString())
      const options = {
          headers,
          params
        };
      return this.http
        .get(this.server + "/GetBinByTest", options)
        .map((response: Response) => response)
        .catch(this.handleError);
    }
  }

  EditAddBin(bin : Bin):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('CodSoggetto', bin.CodSoggetto.toString())
      .set('CodSessione', bin.CodSessione.toString())
      .set('NumBin', bin.NumBin.toString())
      .set('Note', bin.Note.toString())
    const options = {
        headers,
        params
      };
    return this.http
      .put(this.server + "/EditAddBin", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region clear POS
  // ClearPOS(CodEsperimento : number):Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  //   const params = new HttpParams()
  //     .set('CodEsperimento', CodEsperimento.toString())
  //   const options = {
  //       headers,
  //       params
  //     };
  //   return this.http
  //     .delete(this.server + "/ClearPOS", options)
  //     .map((response: Response) => response)
  //     .catch(this.handleError);
  // }
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
