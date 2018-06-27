import  firebase from 'firebase';
import { VariabileIndipendente, Soggetto, Stimolato, Posizione, Stimolo, Utente, Posizionato, Orientato, Orientamento, Bin, Dipendato } from './../../types/types';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Esperimento, Sessione, Test } from '../../types/types';
import { ServiceDbAcadProvider } from '../../providers/service-db-acad/service-db-acad';
import { TestsHomeComponent } from '../../components/tests-home/tests-home';

@IonicPage()
@Component({
  selector: 'page-test-detail',
  templateUrl: 'test-detail.html',
})
export class TestDetailPage {
  user : Utente = JSON.parse(sessionStorage.getItem("User"));

  tests : Test[] = [];
  test : Test;

  selectedSubject : Soggetto;
  session : Sessione = new Sessione();
  exp : Esperimento = new Esperimento();

  indieVar : VariabileIndipendente[] = [];

  searchBar : string = "" ;
  searchedSubjects : Soggetto[] = [];
  subjects : Soggetto[] = [];
  testedSubjects : number[] = [];

  positions : Posizione[] = [];
  stimuli : Stimolo[] = [];
  orient : Orientamento[] = [];

  positioned : Posizionato[];
  oriented : Orientato[];
  posStim : Stimolato[];

  dipendato : Dipendato[];

  bins : Bin[] = [];
  binSupport : Bin[];
  selectedBin : Bin;
  selectedBinNum : string;

  newSubject : Soggetto;
  editSubject : Soggetto;

  tested : boolean;
  testing : boolean;
  pause : boolean;
  end : boolean;

  timer : string = "00:00:00";

  offset : number = 0;
  errmsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sd : ServiceDbAcadProvider, private alertCtrl : AlertController, private loadingCtrl : LoadingController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {}
      else {
        navCtrl.setRoot('WelcomePage');
      }
    });

    //#region Data from page
    this.session = this.navParams.get("session");
    this.exp = this.navParams.get("exp");
    this.indieVar = this.navParams.get("indieVar") as VariabileIndipendente[];

    if(this.session == undefined || this.exp == undefined) {
      this.session = JSON.parse(sessionStorage.getItem("session"));
      this.exp = JSON.parse(sessionStorage.getItem("exp"));
      this.indieVar = JSON.parse(sessionStorage.getItem("indieVar"));
    }
    else {
      sessionStorage.setItem("session", JSON.stringify(this.session));
      sessionStorage.setItem("exp", JSON.stringify(this.exp));
      sessionStorage.setItem("indieVar", JSON.stringify(this.indieVar))
    }
    //#endregion

    //#region Data from database
    this.sd.GetPosizioniByEsperimento(this.session.CodEsperimento)
      .subscribe(res => {
        this.positions = res;
      },
      errorCode => this.errmsg = errorCode
      )

    this.sd.GetStimoliByEsperimento(this.session.CodEsperimento)
      .subscribe(res => {
        this.stimuli = res;
      },
      errorCode => this.errmsg = errorCode
      )

    this.sd.GetOrientamentiByEsperimento(this.session.CodEsperimento)
      .subscribe(res => {
        this.orient = res;
      },
      errorCode => this.errmsg = errorCode
      )
    //#endregion

    this.GetSoggetti(); //carica tutti i soggetti
  }

  ResetVariables() {
    this.tested = false;
    this.testing = false;
    this.pause = false;
    this.end = false;

    this.newSubject = undefined;
    this.editSubject = undefined;

    this.chosOri = undefined;
    this.chosPos = undefined;

    this.selectedBin = undefined;
    this.selectedBinNum = undefined;

    this.distance = undefined;

    clearInterval(this.tim);
    clearInterval(this.posTimer);
    clearInterval(this.oriTimer);
  }

  //#region soggetti
  GetSoggetti() {
    this.sd.GetSoggettiByUtente(this.user.Email)
      .subscribe(res => {
        this.subjects = res;
        this.searchedSubjects = res;
      })
    this.GetSoggettiTestati();
  }

  GetSoggettiTestati() {
    this.sd.GetSoggettiTestati(this.session.CodSessione)
      .subscribe(res => {
        this.testedSubjects = res.map(x => x.CodSoggetto);
      })
  }

  IsTested(CodSoggetto : number) {
    return this.testedSubjects.indexOf(CodSoggetto) >= 0
  }

  Search() {
    this.searchedSubjects = this.subjects.filter(x => x.NomeSoggetto.toUpperCase().includes(this.searchBar.toUpperCase()));
  }

  NewSoggetto() {
    this.newSubject = new Soggetto();
  }

  AddSoggetto() {
    this.newSubject.Email = this.user.Email;
    this.sd.EditAddSoggetto(this.newSubject)
      .subscribe(res => {
        this.sd.GetSoggettoByNome(res.data.NomeSoggetto, this.user.Email)
          .subscribe(res2 => {
            // this.selectedSubject = res2[0];
            this.subjects.push(res2[0]);
            this.newSubject = undefined;
          })

      })
  }

  // EditSoggetto() {
  //   this.editSubject = JSON.parse(JSON.stringify(this.selectedSubject));
  //   this.edit = true;
  // }

  // SaveEdit() {
  //   this.selectedSubject = JSON.parse(JSON.stringify(this.editSubject));
  //   this.edit = false;
  //   this.editSubject = undefined;
  // }

  DisableDeleteTest() : boolean {
    return this.testedSubjects.indexOf(this.selectedSubject.CodSoggetto) < 0
  }

  DeleteSoggetto() {
    const deleteAlert = this.alertCtrl.create({
      title: 'Delete the subject',
      message: 'Are you sure you want to delete this subject (along with its the tests data)?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
          this.sd.DeleteSoggetto(this.selectedSubject)
            .subscribe(res => {
              this.selectedSubject = undefined;
              this.GetSoggetti();
            },
            errorCode => this.errmsg = errorCode
          )
          }
        }
      ]
    });
    deleteAlert.present();
  }
  //#endregion

  //#region test
  //#region before start
  GetTest(sub : Soggetto) {
    this.selectedSubject = undefined;
    this.sd.GetTestSessione(this.session.CodSessione, sub.CodSoggetto)
      .subscribe(res => {
        this.test = res[0];
        if(this.test != undefined) {
          this.tests.push(this.test);
          var index = this.tests.map(x => x.CodSoggetto).indexOf(sub.CodSoggetto);
          this.tested = true;
          this.LoadTestData(this.tests[index], sub);
          this.TestedSubject();
        }
        else
        {
          this.selectedSubject = sub;
          this.selectedBinNum=this.selectedSubject.CodSoggetto.toString() + "1"
          this.LoadNewTest();
          this.SetTimer(); //setta il timer
        }
      },
      errorCode => this.errmsg = errorCode
      )
  }

  SelectedSubject(item : Soggetto, i : number) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 300
    });

    loader.present();

    loader.onDidDismiss(() => {
      this.GetTest(item);
    })
  }

  LoadTestData(test : Test, sub : Soggetto) {
    this.positioned = undefined;
    this.oriented = undefined;
    this.bins = undefined;
    this.dipendato = undefined;
    this.posStim = undefined;

    this.sd.GetPosizionatoByTest(this.session.CodSessione, sub.CodSoggetto)
      .subscribe(res => {
        this.positioned = [];
        for(let i = 0; i < res.length; i++)
          this.positioned[sub.CodSoggetto.toString()+this.session.CodSessione.toString()+res[i].CodPosizione.toString()] = res[i];
        if(this.positioned != undefined && this.oriented != undefined && this.posStim != undefined && this.bins != undefined && this.dipendato != null) {this.selectedSubject = sub; this.selectedBinNum=this.selectedSubject.CodSoggetto.toString() + "1"}
        },
    errorCode => this.errmsg = errorCode
    )

    this.sd.GetOrientatoByTest(this.session.CodSessione, sub.CodSoggetto)
      .subscribe(res => {
        this.oriented = [];
        for(let i = 0; i < res.length; i++)
          this.oriented[sub.CodSoggetto.toString()+this.session.CodSessione.toString()+res[i].CodOrientamento.toString()] = res[i];
        if(this.positioned != undefined && this.oriented != undefined && this.posStim != undefined && this.bins != undefined && this.dipendato != null) {this.selectedSubject = sub; this.selectedBinNum=this.selectedSubject.CodSoggetto.toString() + "1"}
        },
    errorCode => this.errmsg = errorCode
    )

    this.sd.GetStimolatoByTest(this.session.CodSessione, sub.CodSoggetto)
      .subscribe(res => {
        this.posStim = res;
        if(this.positioned != undefined && this.oriented != undefined && this.posStim != undefined && this.bins != undefined && this.dipendato != null) {this.selectedSubject = sub; this.selectedBinNum=this.selectedSubject.CodSoggetto.toString() + "1"}
        },
    errorCode => this.errmsg = errorCode
    )

    this.sd.GetDipendatoByTest(this.session.CodSessione, sub.CodSoggetto)
    .subscribe(res => {
      this.dipendato = [];
      for(let i = 0; i < res.length; i++)
        this.dipendato[sub.CodSoggetto.toString()+this.session.CodSessione.toString()+res[i].CodVariabile.toString()] = res[i];
      if(this.positioned != undefined && this.oriented != undefined && this.posStim != undefined && this.bins != undefined && this.dipendato != null) {this.selectedSubject = sub; this.selectedBinNum=this.selectedSubject.CodSoggetto.toString() + "1"}
      },
    errorCode => this.errmsg = errorCode
    )

    this.sd.GetBinByTest(this.session.CodSessione, sub.CodSoggetto)
    .subscribe(res => {
      this.bins = res;
      if(this.positioned != undefined && this.oriented != undefined && this.posStim != undefined && this.bins != undefined && this.dipendato != null) {this.selectedSubject = sub; this.selectedBinNum=this.selectedSubject.CodSoggetto.toString() + "1"}
    },
    errorCode => this.errmsg = errorCode
    )
  }

  TestedSubject() {
    this.timer = "TEST ENDED"
  }

  LoadNewTest() {
    this.test = new Test();
    this.test.CodSessione = this.session.CodSessione;
    this.test.CodSoggetto = this.selectedSubject.CodSoggetto;
    this.positioned = [];
    this.oriented = [];
    this.dipendato = [];
    this.posStim = [];
    this.testing = false;
    this.tested = false;
    this.pause = false;
    this.SetPOD();
    this.SetBins();
  }

  SetPOD() {
    if(this.positioned.map(x => x.CodSoggetto).indexOf(this.selectedSubject.CodSoggetto) < 0)
      for(let i in this.positions) {
        let tmp = new Posizionato();
        tmp.CodSessione = this.session.CodSessione;
        tmp.CodPosizione = this.positions[i].CodPosizione;
        tmp.CodSoggetto = this.selectedSubject.CodSoggetto;
        tmp.Tempo = 0;
        this.positioned[this.selectedSubject.CodSoggetto.toString()+this.session.CodSessione.toString()+this.positions[i].CodPosizione.toString()] = tmp;
      }

    if(this.oriented.map(x => x.CodSoggetto).indexOf(this.selectedSubject.CodSoggetto) < 0)
      for(let i in this.orient) {
        let tmp = new Orientato();
        tmp.CodSessione = this.session.CodSessione;
        tmp.CodOrientamento = this.orient[i].CodOrientamento;
        tmp.CodSoggetto = this.selectedSubject.CodSoggetto;
        tmp.Tempo = 0;
        this.oriented[this.selectedSubject.CodSoggetto.toString()+this.session.CodSessione.toString()+this.orient[i].CodOrientamento.toString()] = tmp;
      }
    if(this.dipendato.map(x => x.CodSoggetto).indexOf(this.selectedSubject.CodSoggetto) < 0)
      for(let i in this.indieVar) {
        let tmp = new Dipendato();
        tmp.CodSessione = this.session.CodSessione;
        tmp.CodSoggetto = this.selectedSubject.CodSoggetto;
        tmp.CodVariabile = this.indieVar[i].CodVariabile;
        tmp.Valore = "";
        this.dipendato[this.selectedSubject.CodSoggetto.toString()+this.session.CodSessione.toString()+this.indieVar[i].CodVariabile.toString()] = tmp;
      }
  }

  SetBins() {
    if(this.bins.map(x => x.CodSoggetto).indexOf(this.selectedSubject.CodSoggetto) < 0) {
      for(let i = 0; i < this.exp.NumeroBin; i++) {
        let tmp = new Bin();
        tmp.CodSessione = this.session.CodSessione;
        tmp.CodSoggetto = this.selectedSubject.CodSoggetto;
        tmp.NumBin = i+1;
        this.bins.push(tmp);
      }
    }
  }

  AddStimPos() {
    let newStimPos = new Stimolato();
    newStimPos.CodSessione = this.session.CodSessione;
    newStimPos.CodSoggetto = this.selectedSubject.CodSoggetto;
    this.posStim.push(newStimPos);
  }
  //#endregion
  StartTest() {
    if(this.test.DataEsperimento == "")
      this.test.DataEsperimento = new Date().toISOString().slice(0, 19);
    if(this.test.DataInserimento == "")
      this.test.DataInserimento = new Date().toISOString().slice(0, 19);
    this.testing = true;
    this.pause = false;
    this.StartTimer(this.distance);
    if(this.posTimer != undefined)
      this.ChangePosition(this.chosPos);
    if(this.oriTimer != undefined)
      this.ChangeOrient(this.chosOri);
  }
  //#region during test
  PauseTest() {
    clearInterval(this.tim);
    clearInterval(this.posTimer);
    clearInterval(this.oriTimer);
    this.pause = true;
  }

  ResetTest() {
    const reset = this.alertCtrl.create({
      title: 'Delete the test',
      message: 'Are you sure you want to reset this test (along with the tests data)?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            clearInterval(this.posTimer);
            clearInterval(this.oriTimer)
            this.SetTimer();
            this.ResetVariables();
            this.LoadNewTest();
          }
        }
      ]
    });
    reset.present();
  }

  posTimer : any;
  chosPos : Posizione;
  ChangePosition(chosen : Posizione) {
    if(chosen == undefined) return;
    if(this.exp.PrimaScelta.toString() == "true" && this.test.PrimaScelta == "") {
      this.test.PrimaScelta = chosen.NomePosizione;
    }
    if(this.exp.Transizioni.toString() == "true") {
      if(this.chosPos != chosen) this.test.Transizioni++;
    }
    this.chosPos = chosen;

    clearInterval(this.posTimer);
    this.posTimer = setInterval(() => {
      this.positioned[this.selectedSubject.CodSoggetto.toString() + this.session.CodSessione.toString() + chosen.CodPosizione.toString()].Tempo += 10;
    }, 10)
  }

  oriTimer : any;
  chosOri : Orientamento;
  ChangeOrient(chosen : Orientamento) {
    if(chosen == undefined) return;
    clearInterval(this.oriTimer);
    this.oriTimer = setInterval(() => {
      this.oriented[this.selectedSubject.CodSoggetto.toString() + this.session.CodSessione.toString() + chosen.CodOrientamento.toString()].Tempo+=10;
    }, 10)
  }
  //#endregion

  //#region after stop
  EndTest() {
    this.end = true;
    clearInterval(this.tim);
    clearInterval(this.posTimer);
    clearInterval(this.oriTimer);
    this.timer = "TIME OUT";
    this.testing = false;
    this.pause = false;
    this.GetSoggettiTestati();
  }

  DeleteTestSoggetto() {
    const deleteTest = this.alertCtrl.create({
      title: 'Delete the test',
      message: 'Are you sure you want to delete this test (along with its data)?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.sd.DeleteTestSoggetto(this.test)
              .subscribe();
            this.selectedSubject = undefined;
            this.GetSoggettiTestati();
          }
        }
      ]
    });
    deleteTest.present();
  }

  CancelTest() {
    if(!this.tested)
      this.ResetTest();
    else
      this.GetTest(this.selectedSubject);
  }

  SaveTest() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 300
    });

    loader.present();
    if(this.tested == false) {
      if(this.exp.Latenza.toString() == "true" && this.test.Latenza == 0) {
        this.test.Latenza = ((this.exp.NumeroBin * this.exp.DurataBin)*1000) - this.positioned.map(x => x.Tempo).reduce((a,b) => a+b);
      }
      this.sd.EditAddTest(this.test)
      .subscribe(res => {

        for(let i in this.positioned) {
          this.sd.EditAddPosizionato(this.positioned[i])
            .subscribe()
        }

        for(let i in this.oriented) {
          this.sd.EditAddOrientato(this.oriented[i])
            .subscribe()
        }
        this.tested = true;
        this.end = false;
        this.GetSoggettiTestati();
        this.TestedSubject();
      },
      errorCode=> this.errmsg = errorCode
      );
    }

    for(let i in this.posStim) {
      this.posStim[i].Tempo = this.positioned.filter(x => x.CodPosizione == this.posStim[i].CodPosizione).map(x => x.Tempo).reduce((a,b) => a + b);
      this.sd.EditAddStimolato(this.posStim[i])
        .subscribe()
    }

    for(let i in this.dipendato) {
      this.sd.EditAddDipendato(this.dipendato[i])
        .subscribe()
    }

    for(let i in this.bins) {
      this.sd.EditAddBin(this.bins[i])
        .subscribe()
    }
  }
  //#endregion

  //#endregion

  //#region timer
  SetTimer() {
    if(this.tested == true) this.EndTest(); else {
      var countDownDate = new Date().getTime() + (this.exp.DurataBin * this.exp.NumeroBin * 1000);
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timer = (hours > 0 ? hours  + ":" : "" ) + minutes + ":" + (seconds < 10 ? "0"+seconds : seconds );
    }
  }
  tim : any;
  distance : number;
  StartTimer(durata : number) {
    if(durata == undefined) durata = this.exp.DurataBin * this.exp.NumeroBin * 1000;
    var countDownDate = new Date().getTime() + (durata);

    this.tim = setInterval(() => {
      var now = new Date().getTime();

      this.distance = countDownDate - now;

      var hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

      this.timer = (hours > 0 ? hours  + ":" : "" ) + minutes + ":" + (seconds < 10 ? "0"+seconds : seconds );

      if (this.distance < 0) {
        this.EndTest();
      }
    }, 1000);
  }
  //#endregion

  //#region canvas
  private canvasEl: ElementRef;

  @ViewChild('canvas') set canvas(content: ElementRef) {
    this.canvasEl = content;
  }

  private arenaCa: ElementRef;

  @ViewChild('arena') set arena(content: ElementRef) {
    this.arenaCa = content;
    if(this.arenaCa != undefined)
      this.LoadArena();
  }

  // @ViewChild('arena') set arenaCa(content: ElementRef) {
  //    this.contentPlaceholder = content;
  // }

  // @ViewChild('arena') arenaCa : ElementRef;

  private _CANVAS  : any;
  private _CONTEXT : any;

  /**
    * Implement functionality as soon as the template view has loaded
    *
    * @public
    * @method ionViewDidLoad
    * @return {none}
    */

  LoadArena() : void
  {
    // this.ngOnInit();
    this._CANVAS 		    = this.canvasEl.nativeElement;
    this._CANVAS.width  	= this.arenaCa.nativeElement.offsetWidth - this.arenaCa.nativeElement.offsetWidth/4;
    this._CANVAS.height 	= this.arenaCa.nativeElement.offsetHeight - this.arenaCa.nativeElement.offsetHeight/4;

    this.initialiseCanvas();
  }

  /**
    * Detect if HTML5 Canvas is supported and, if so, configure the
    * canvas element accordingly
    *
    * @public
    * @method initialiseCanvas
    * @return {none}
    */
  initialiseCanvas() : void
  {
     if(this._CANVAS.getContext)
     {
        this.setupCanvas();
        this.ChangeShape();
     }
  }
  //#region draw

  ChangeShape() {
    switch(this.exp.Forma) {
      case "rectangle": this.drawRectangle(); break;
      case "circle": this.drawCircle(); break;
      case "square": this.drawSquare(); break;
    }
    if(this.exp.MostraPosizioni.toString() == "true") this.DrawPositions();
  }

  DrawPositions() {
    if(this.exp.MostraPosizioni.toString() == "true") {
      let pos = this.positions.length;
      switch(this.exp.Forma) {
        case "rectangle":
          if(pos > 1) {
            for(let i = 1; i < pos; i++) {
              this._CONTEXT.beginPath();
              let x = this._CANVAS.width/10 + i*(4*this._CANVAS.width/5)/pos;
              let y = this._CANVAS.height/6
              this._CONTEXT.moveTo(x, y);
              let y2 = 2*this._CANVAS.height/3 + this._CANVAS.height/6
              this._CONTEXT.lineTo(x, y2);
              this._CONTEXT.lineWidth = 2;
              this._CONTEXT.strokeStyle = '#0ff';
              this._CONTEXT.stroke();
            }
          }
        break;
        case "square":
          if(pos > 1 && pos != 4) {
            for(let i = 1; i < pos; i++) {
              this._CONTEXT.beginPath();
              let x = (this._CANVAS.width/2 - this._CANVAS.height/3) + i*(2*this._CANVAS.height/3)/pos;
              let y = this._CANVAS.height/6
              this._CONTEXT.moveTo(x, y);
              let y2 = 2*this._CANVAS.height/3 + this._CANVAS.height/6
              this._CONTEXT.lineTo(x, y2);
              this._CONTEXT.lineWidth = 2;
              this._CONTEXT.strokeStyle = '#0ff';
              this._CONTEXT.stroke();
            }
          }
          else if (pos == 4) {
            this._CONTEXT.beginPath();
              let x = (this._CANVAS.width/2 - this._CANVAS.height/3) + (2*this._CANVAS.height/3)/2;
              let y = this._CANVAS.height/6
              this._CONTEXT.moveTo(x, y);
              let y2 = 2*this._CANVAS.height/3 + this._CANVAS.height/6
              this._CONTEXT.lineTo(x, y2);

              x = this._CANVAS.width/2 - this._CANVAS.height/3;
              y = this._CANVAS.height/2;
              this._CONTEXT.moveTo(x,y);
              let x2 = (this._CANVAS.width/2 - this._CANVAS.height/3) + 2*this._CANVAS.height/3;
              this._CONTEXT.lineTo(x2, y);
              this._CONTEXT.lineWidth = 2;
              this._CONTEXT.strokeStyle = '#0ff';
              this._CONTEXT.stroke();
          }
        break;
      }
    }
    else this.ChangeShape();
  }

  /**
    * Create a circle using canvas drawing API
    *
    * @public
    * @method drawCircle
    * @return {none}
    */
  drawCircle() : void
  {
     this.clearCanvas();
     this._CONTEXT.beginPath();

     // x, y, radius, startAngle, endAngle
     this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, this._CANVAS.width/4, 0, 2 * Math.PI);
     this._CONTEXT.lineWidth   = 2;
     this._CONTEXT.strokeStyle = '#ffffff';
     this._CONTEXT.stroke();
  }

  /**
    * Create a square using canvas drawing API
    *
    * @public
    * @method drawSquare
    * @return {none}
    */
  drawSquare() : void
  {
     this.clearCanvas();
     this._CONTEXT.beginPath();
     this._CONTEXT.rect(this._CANVAS.width/2 - this._CANVAS.height/3, this._CANVAS.height/2 - this._CANVAS.height/3, 2*this._CANVAS.height/3, 2*this._CANVAS.height/3);
     this._CONTEXT.lineWidth   = 2;
     this._CONTEXT.strokeStyle = '#ffffff';
     this._CONTEXT.stroke();
  }

  /**
    * Create a triangle using canvas drawing API
    *
    * @public
    * @method drawTriangle
    * @return {none}
    */
  drawRectangle() : void
  {
    this.clearCanvas();
    this._CONTEXT.beginPath();
    this._CONTEXT.rect(this._CANVAS.width/2 - 2*this._CANVAS.width/5, this._CANVAS.height/2 - this._CANVAS.height/3, 4*this._CANVAS.width/5, 2*this._CANVAS.height/3);
    this._CONTEXT.lineWidth   = 2;
    this._CONTEXT.strokeStyle = '#ffffff';
    this._CONTEXT.stroke();
  }

  /**
    * Configure the Canvas element
    *
    * @public
    * @method setupCanvas
    * @return {none}
    */
  setupCanvas() : void
  {
     this._CONTEXT = this._CANVAS.getContext('2d');
     this._CONTEXT.fillStyle = "#3f4652";
     this._CONTEXT.fillRect(0, 0, 500, 500);
  }

  /**
    * Reset the Canvas element/clear previous content
    *
    * @public
    * @method clearCanvas
    * @return {none}
    */
  clearCanvas() : void
  {
     this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
     this.setupCanvas();
  }
  //#endregion
  //#endregion
}
