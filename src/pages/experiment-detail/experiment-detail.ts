import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Esperimento, Posizione, Orientamento, Stimolo } from '../../types/types';
import { ServiceDbAcadProvider } from '../../providers/service-db-acad/service-db-acad';

@IonicPage()
@Component({
  selector: 'page-experiment-detail',
  templateUrl: 'experiment-detail.html',
})
export class ExperimentDetailPage {
  experiment : Esperimento;

  positions : Posizione[] = [new Posizione()];
  orientations : Orientamento[] = [new Orientamento()];
  stimuli : Stimolo[] = [new Stimolo()];

  showPositions : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sd : ServiceDbAcadProvider) {
    this.experiment = new Esperimento();

    this.sd.GetEsperimentiUsati()
      .subscribe(res => {
        this.usedExp = res.map(x => x.CodEsperimento);
      })
  }


  ngOnInit() {
    let tmp = this.navParams.get("exp");
    if(tmp != undefined)
      this.experiment = JSON.parse(JSON.stringify(tmp));
    else
      this.experiment = JSON.parse(sessionStorage.getItem("exp"));

    this.experiment.MostraPosizioni = this.experiment.MostraPosizioni.toString() == "true";

    if(this.experiment.NomeEsperimento != "") {
      this.LoadEditExperiment();
    }
    else
      this.ChangeShape();

      console.log(this.experiment);
  }

  usedExp : number[];
  UnusedExperiment():boolean {
    if(this.usedExp != undefined)
      return this.usedExp.indexOf(this.experiment.CodEsperimento) < 0;
    else
      return false;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  NewPos() {
    this.positions.push(new Posizione());
    this.CheckPos()
  }

  NewStim() {
    this.stimuli.push(new Stimolo())
  }

  NewOrient() {
    this.orientations.push(new Orientamento())
  }

  CheckPos() {
    if(this.experiment.MostraPosizioni) this.ChangeShape();
  }

  LoadEditExperiment(): any {
    this.sd.GetPosizioniByEsperimento(this.experiment.CodEsperimento)
      .subscribe(res => {
        this.positions = res;

        this.sd.GetOrientamentiByEsperimento(this.experiment.CodEsperimento)
        .subscribe(res => {
          this.orientations = res;

          this.sd.GetStimoliByEsperimento(this.experiment.CodEsperimento)
            .subscribe(res => {
              this.stimuli = res;
              this.ChangeShape();
          });
        });
      });
  }

  Cancel() {
    this.navCtrl.setRoot('HomePage', {"clicked": "exp"});
  }

  Save() {
    this.sd.EditAddEsperimento(this.experiment)
      .subscribe(res => {
        this.sd.GetEsperimentoByNome(res.data.NomeEsperimento, this.experiment.Email)
          .subscribe(res2 => {
            this.experiment.CodEsperimento = res2[0].CodEsperimento;
            this.SaveOther();
          })
      })
  }

  SaveOther() {
    // this.sd.ClearPOS(this.experiment.CodEsperimento)
    //   .subscribe(res => {
        for(var i = 0; i< this.positions.length; i++) {
          var tmp = new Posizione();
          tmp = this.positions[i];
          this.sd.EditAddPosizioneToEsperimento(this.experiment.CodEsperimento, tmp)
            .subscribe();
        }

        for(var j = 0; j< this.orientations.length; j++) {
          var tmp2 = new Orientamento();
          tmp2 = this.orientations[j];
          this.sd.EditAddOrientamentoToEsperimento(this.experiment.CodEsperimento, tmp2)
            .subscribe();
        }

        for(var k = 0; k< this.stimuli.length; k++) {
          var tmp3 = new Stimolo();
          tmp3 = this.stimuli[k];
          this.sd.EditAddStimoloToEsperimento(this.experiment.CodEsperimento, tmp3)
            .subscribe();
        }
        this.navCtrl.setRoot('HomePage', {"clicked": "exp"});
      // });
    }

  onTestClick(test: boolean) {
    this.navCtrl.setRoot('HomePage', {"clicked": "test"});
  }

  onHomeClick(card: boolean) {
    this.navCtrl.setRoot('HomePage', {"clicked": "home"});
  }

  onExperimentClick(experiment: boolean) {
    this.navCtrl.setRoot('HomePage', {"clicked": "exp"});
  }

  LogOut() {
    this.navCtrl.setRoot('HomePage', {"clicked": "logout"});
  }



  //#region canvas

  @ViewChild('canvas') canvasEl : ElementRef;
  @ViewChild('arena') arenaCa : ElementRef;

  private _CANVAS  : any;
  private _CONTEXT : any;

  /**
    * Implement functionality as soon as the template view has loaded
    *
    * @public
    * @method ionViewDidLoad
    * @return {none}
    */

  ionViewDidLoad() : void
  {
    this.ngOnInit();
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
     }
  }
  //#region draw

  ChangeShape() {
    switch(this.experiment.Forma) {
      case "rectangle": this.drawRectangle(); break;
      case "circle": this.drawCircle(); break;
      case "square": this.drawSquare(); break;
    }
    if(this.experiment.MostraPosizioni || this.experiment.MostraPosizioni.toString() == "true") this.DrawPositions();
  }

  DrawPositions() {
    if(this.experiment.MostraPosizioni || this.experiment.MostraPosizioni.toString() == "true") {
      let pos = this.positions.length;
      switch(this.experiment.Forma) {
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
