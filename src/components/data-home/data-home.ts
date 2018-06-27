import { Component, NgModule } from '@angular/core';
import { ServiceDbAcadProvider } from '../../providers/service-db-acad/service-db-acad';
import { Utente, Data, BinData, VariabileIndipendente, Posizione, Orientamento, Stimolo, DipData, OriData, PosData, StimData, Bin } from '../../types/types';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'data-home',
  templateUrl: 'data-home.html'
})
export class DataHomeComponent {
  user : Utente = JSON.parse(sessionStorage.getItem("User"));

  sceltaLista : string;
  array : {Nome: string, Checked : boolean}[];

  selected : any;

  positions : Posizione[];
  orient : Orientamento[];
  stim : Stimolo[];
  indieVar : VariabileIndipendente[];
  bins : Bin[];

  dati : Data[];

  onset : number[];
  offset : number[];

  constructor(private sd : ServiceDbAcadProvider, private sanitizer : DomSanitizer ) {
    this.LoadSessions();
  }

  // LoadSubjects() {
  //   this.sd.GetSoggettiByUtente(this.user.Email).subscribe(res => {this.array = res.map(x => x.NomeSoggetto.toString())});
  // }

  LoadSessions() {
    this.sd.GetSessioni(this.user.Email).subscribe(res => this.array = res.map(x => ({"Nome": x.NomeSessione.toString(), "Checked": false})));
  }

  // LoadExperiments() {
  //   this.sd.GetEsperimenti(this.user.Email).subscribe(res => this.array = res.map(x => ({"Nome": x.NomeEsperimento.toString(), "Checked": false})));
  // }

  Select(item : {Nome: string, Checked: boolean}, checked:boolean) {
    this.dati = [];
    let ses = this.array.filter(x => x.Checked).map(y => y.Nome);
    if (ses.length == 0) {this.dati = undefined; return}
    this.SelectSessions(ses);
  }

  SelectSessions(sessions:string[]) {
    for(let a = 0; a<sessions.length; a++) {
      this.sd.GetSessioneByNome(sessions[a], this.user.Email).subscribe(sessione => {
        sessione = sessione[0];
        this.sd.GetEsperimentoByCodice(sessione.CodEsperimento).subscribe(exp => {
          exp = exp[0];
          this.sd.GetPosizioniByEsperimento(exp.CodEsperimento).subscribe(poss => {
            this.positions = poss;
            this.positions.sort((a, b) => {
              if(a.CodPosizione < b.CodPosizione) return -1;
              if(a.CodPosizione > b.CodPosizione) return 1;
              return 0
            })
            this.sd.GetOrientamentiByEsperimento(exp.CodEsperimento).subscribe(orient => {
              this.orient = orient;
              this.orient.sort((a, b) => {
                if(a.CodOrientamento < b.CodOrientamento) return -1;
                if(a.CodOrientamento > b.CodOrientamento) return 1;
                return 0
              })
              this.sd.GetStimoliByEsperimento(exp.CodEsperimento).subscribe(stim => {
                this.stim = stim;
                this.stim.sort((a, b) => {
                  return a.NomeStimolo.toUpperCase().localeCompare(b.NomeStimolo.toUpperCase());
                })
                this.sd.GetVariabiliBySessione(sessione.CodSessione).subscribe(indievar => {
                  this.indieVar = indievar;
                  this.indieVar.sort((a, b) => {
                    if(a.CodVariabile < b.CodVariabile) return -1;
                    if(a.CodVariabile > b.CodVariabile) return 1;
                    return 0
                  })
                  this.sd.GetSoggettiBySessione(sessione.CodSessione).subscribe(subs => {
                    for(let i = 0; i < subs.length; i++) {
                      this.sd.GetTestSessione(sessione.CodSessione, subs[i].CodSoggetto).subscribe(test => {
                        test = test[0];
                        this.sd.GetPosizionatoByTest(sessione.CodSessione, subs[i].CodSoggetto).subscribe(pos => {
                          this.sd.GetOrientatoByTest(sessione.CodSessione, subs[i].CodSoggetto).subscribe(ori => {
                            this.sd.GetDipendatoByTest(sessione.CodSessione, subs[i].CodSoggetto).subscribe(dip => {
                              this.sd.GetBinByTest(sessione.CodSessione, subs[i].CodSoggetto).subscribe(bin => {
                                this.bins = bin;
                                this.bins.sort((a, b) => {
                                  if(a.NumBin < b.NumBin) return -1;
                                  if(a.NumBin > b.NumBin) return 1;
                                  return 0
                                })
                                this.sd.GetStimolatoByTest(sessione.CodSessione, subs[i].CodSoggetto).subscribe(stim => {
                                  let tmp : Data = new Data();
                                  tmp.Bin = bin.map(x => {
                                    var rObj = {};
                                    rObj["NumBin"] = "Bin n. " + x.NumBin;
                                    rObj["Note"] = x.Note;
                                    return rObj as BinData
                                  });
                                  tmp.Bin.sort((a, b) => {
                                    if(a.NumBin < b.NumBin) return -1;
                                    if(a.NumBin > b.NumBin) return 1;
                                    return 0
                                  })
                                  tmp.DataEsperimento = new Date(test.DataEsperimento).toLocaleDateString();
                                  tmp.Descrizione = subs[i].Descrizione;
                                  tmp.Dipendato = dip.map(x => {
                                    var rObj = {};
                                    rObj["NomeVariabile"] = this.indieVar.filter(y=>y.CodVariabile == x.CodVariabile).map(y => y.NomeVariabile)[0];
                                    rObj["Valore"] = x.Valore;
                                    return rObj as DipData
                                  });
                                  tmp.Latenza = test.Latenza;
                                  tmp.NomeEsperimento = exp.NomeEsperimento;
                                  tmp.NomeSoggetto = subs[i].NomeSoggetto;
                                  tmp.Orientato = ori.map(x => {
                                    var rObj = {};
                                    rObj["NomeOrientamento"] = this.orient.filter(y=>y.CodOrientamento == x.CodOrientamento).map(y => y.NomeOrientamento)[0];
                                    rObj["Tempo"] = x.Tempo;
                                    return rObj as OriData
                                  });
                                  tmp.Posizionato = pos.map(x => {
                                    var rObj = {};
                                    rObj["NomePosizione"] = this.positions.filter(y=>y.CodPosizione == x.CodPosizione).map(y => y.NomePosizione)[0];
                                    rObj["Tempo"] = x.Tempo;
                                    return rObj as PosData
                                  });
                                  tmp.PrimaScelta = test.PrimaScelta;
                                  tmp.Stimolato = stim.map(x => {
                                    var rObj = {};
                                    rObj["NomeStimolo"] = this.stim.filter(y=>y.CodStimolo == x.CodStimolo).map(y => y.NomeStimolo)[0];
                                    rObj["Tempo"] = stim.filter(y=>y.CodStimolo == x.CodStimolo).map(y => y.Tempo).reduce((a,b) => a+b);
                                    return rObj as StimData
                                  });
                                  tmp.Stimolato.sort((a, b) => {
                                    return a.NomeStimolo.toUpperCase().localeCompare(b.NomeStimolo.toUpperCase());
                                  });
                                  if(tmp.Stimolato.map(x=>x.NomeStimolo).length < this.stim.map(x=>x.NomeStimolo).length) {
                                    for(let f in this.stim) {
                                      if(tmp.Stimolato.map(x => x.NomeStimolo).indexOf(this.stim[f].NomeStimolo) < 0) {
                                        let aa = new StimData();
                                        aa.NomeStimolo = this.stim[f].NomeStimolo;
                                        aa.Tempo = 0;
                                        tmp.Stimolato.push(aa);
                                      }
                                    }
                                  }
                                  tmp.Stimolato = tmp.Stimolato.filter((obj, pos, arr) => {return arr.map(mapObj => mapObj["NomeStimolo"]).indexOf(obj["NomeStimolo"]) === pos;});
                                  tmp.Transizioni = test.Transizioni;
                                  this.dati.push(tmp)
                                })
                              })
                            })
                          })
                        })
                      })
                    }
                  })
                })
              })
            })
          })
        })
      })
    }
  }

  downloadJsonHref : any;
  dataName : string;
  DownloadJSON() {
    let theJSON = JSON.stringify(this.dati);
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.dataName = new Date().toISOString() + "___";
    for(var d = 0; d<this.array.length; d++) {
      this.dataName += this.array[d].Nome + ";";
    }
    this.dataName += ".json";
    this.downloadJsonHref = uri;
  }

  downloadCsvHref : any;
  DownloadCSV() {
    let csv = "Subject,Experiment,Date," + this.positions.map(x => x.NomePosizione) +","+ this.orient.map(x => x.NomeOrientamento) +","+ this.indieVar.map(x => x.NomeVariabile) +","+ this.positions.map(x => x.NomePosizione) +","+ this.bins.map(x => x.NumBin) +","+ "First Choice,Latency,Transitions\n";
    for(let r = 0; r<this.dati.length; r++) {
      let dato = this.dati[r];
      csv+=`${dato.NomeSoggetto},${dato.Dipendato.map(x=>x.Valore)},${dato.NomeEsperimento},${dato.DataEsperimento},${dato.Posizionato.map(x=>x.Tempo)},${dato.Orientato.map(x=>x.Tempo)},${dato.Stimolato.map(x=>x.NomeStimolo)},${dato.Bin.map(x=>x.Note)},${dato.PrimaScelta},${dato.Latenza},${dato.Transizioni}\n`
    }
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/csv;charset=UTF-8," + encodeURIComponent(csv));
    this.dataName = new Date().toISOString() + "___";
    for(var d = 0; d<this.array.length; d++) {
      this.dataName += this.array[d].Nome + ";";
    }
    this.dataName += ".csv";
    this.downloadCsvHref = uri;
  }
}
