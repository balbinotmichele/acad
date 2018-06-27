import firebase from 'firebase';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { Utente } from '../../types/types';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user : Utente;

  test : boolean;
  experiment : boolean;
  card : boolean;
  data : boolean;

  choice : string;

  constructor(public navCtrl: NavController, public navParams : NavParams, public loadingCtrl : LoadingController) {
    if(sessionStorage.getItem('User') == null || sessionStorage.getItem('User') == undefined) {
        firebase.auth().signOut().then(() => {
          this.navCtrl.setRoot('WelcomePage');
        })
    }
    this.user = navParams.get('user');
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {}
      else {
        navCtrl.setRoot('WelcomePage');
      }
    });

    this.choice = navParams.get('clicked');
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.duration/2
    });

    loader.present();
    loader.onDidDismiss(() => {
      switch(this.choice) {
        case "test": this.onTestClick(true); break;
        case "exp": this.onExperimentClick(true); break;
        case "home": this.onHomeClick(true); break;
        case "data": this.onDataClick(true); break;
        case "logout": this.LogOut(); break;
        default: this.onHomeClick(true); break;
      }
    });
  }

  duration : number = 300;

  onTestClick(test: boolean) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.duration
    });

    loader.present();
    loader.onDidDismiss(() => {
      this.test = true;
      this.card = false;
      this.experiment = false;
      this.data = false;
    });
  }

  onHomeClick(card: boolean) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.duration
    });

    loader.present();
    loader.onDidDismiss(() => {
      this.card = true;
      this.test = false;
      this.experiment = false;
      this.data = false;
    });
  }

  onExperimentClick(experiment: boolean) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.duration
    });

    loader.present();
    loader.onDidDismiss(() => {
      this.experiment = true;
      this.card = false;
      this.test = false;
      this.data = false;
    });
  }

  onDataClick(data : boolean) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.duration
    });

    loader.present();
    loader.onDidDismiss(() => {
      this.experiment = false;
      this.card = false;
      this.test = false;
      this.data = true;
    });
  }

  LogOut() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 600
    });

    loader.present();
    loader.onDidDismiss(() => {
      firebase.auth().signOut().then(() => {
        sessionStorage.clear();
        this.navCtrl.setRoot('WelcomePage');
      })
    });
  }
}
