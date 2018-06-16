import firebase from 'firebase';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Esperimento } from '../../types/types';
import { empty } from 'rxjs/Observer';

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

  constructor(public navCtrl: NavController, public loadingCtrl : LoadingController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      } else {
        sessionStorage.clear();
        navCtrl.setRoot('WelcomePage');
      }
    });
  }

  ExperimentClicked(tmp : Esperimento) {
    if(tmp.Email == "") tmp.Email = JSON.parse(sessionStorage.getItem('User')).Email;

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 300
    });

    loader.present();
    loader.onDidDismiss(() => {
      sessionStorage.setItem("exp", JSON.stringify(tmp));
      this.navCtrl.push('ExperimentDetailPage', {"exp": tmp});
    });

  }
}
