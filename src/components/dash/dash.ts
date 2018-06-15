import firebase from 'firebase';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Esperimento } from '../../types/types';

@Component({
  selector: 'dash',
  templateUrl: 'dash.html'
})
export class DashComponent {
  @Input() test : boolean;
  @Input() experiment : boolean;
  @Input() card : boolean;

  @Output() testsClick: EventEmitter<boolean> = new EventEmitter();
  @Output() experimentsClick: EventEmitter<boolean> = new EventEmitter();

  newExperiment : boolean;
  exp : Esperimento;

  constructor(public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      } else {
        sessionStorage.clear();
        navCtrl.setRoot('WelcomePage');
      }
    });
  }

  ExperimentClicked(tmp : Esperimento) {
    this.navCtrl.push('ExperimentDetailPage', {"exp": tmp});
  }
}
