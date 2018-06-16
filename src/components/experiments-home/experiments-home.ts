import { ServiceDbAcadProvider } from './../../providers/service-db-acad/service-db-acad';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Esperimento } from '../../types/types';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'experiments-home',
  templateUrl: 'experiments-home.html'
})
export class ExperimentsHomeComponent implements OnInit {
  @Output() experimentClick : EventEmitter<Esperimento> = new EventEmitter();

  experiments: Esperimento[];
  email : string;

  errmsg : string;

  constructor(private sd : ServiceDbAcadProvider, public navCtrl : NavController) {}

  ngOnInit() {
    this.email = JSON.parse(sessionStorage.getItem('User')).Email;
    this.sd.GetEsperimenti(this.email)
      .subscribe(res => {
        this.experiments = res
      },
      errorCode => this.errmsg = errorCode
    );
  }

  NewExperiment() {
    let newExp : Esperimento = new Esperimento();
    this.experimentClick.emit(newExp);
  }

  // CopyExperiment(exp : Esperimento) {
  //   exp.CodEsperimento = 0;
  //   exp.NomeEsperimento += " - Copia";
  //   this.sd.EditAddEsperimento(exp)
  //     .subscribe(res => {
  //       exp = res[0];
  //       this.experiments.push(exp);
  //     })
  // }

  DeleteExperiment(exp : Esperimento, i : number) {
    this.sd.DeleteEsperimento(exp.CodEsperimento)
      .subscribe(res => {
        this.ngOnInit();
        // this.experiments.splice(i, 1);
      },
      errorCode => this.errmsg = errorCode
    )
  }
}
