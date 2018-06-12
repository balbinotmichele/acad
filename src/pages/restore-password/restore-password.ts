import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from "firebase";
/**
 * Generated class for the RestorePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restore-password',
  templateUrl: 'restore-password.html',
})
export class RestorePasswordPage {
  mail:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Restore() {
    firebase.auth().sendPasswordResetEmail(this.mail).then(() => {
      this.navCtrl.setRoot('WelcomePage');
    })
  }

}
