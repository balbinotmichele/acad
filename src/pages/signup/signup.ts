import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from "firebase";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {
  mail:string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  Create() {
    firebase.auth().createUserWithEmailAndPassword(this.mail, this.password).then(() => {
      this.navCtrl.pop();
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }

}
