import { ServiceDbAcadProvider } from './../../providers/service-db-acad/service-db-acad';
import { Component, EventEmitter, Output } from '@angular/core';
import { Esperimento } from '../../types/types';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'experiments-home',
  templateUrl: 'experiments-home.html'
})
export class ExperimentsHomeComponent {
  @Output() experimentClick : EventEmitter<Esperimento> = new EventEmitter();

  experiments: Esperimento[];
  email : string;

  errmsg : string;

  constructor(private sd : ServiceDbAcadProvider, public navCtrl : NavController) {
    this.email = sessionStorage.getItem('UserEmail');
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

}
