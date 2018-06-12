import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';

import firebase from "firebase";
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  styles: ['welcome.scss']
})
export class WelcomePage {
  mail:string;
  password: string;

  tmp:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  doLogin() {
    firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(() => {
      console.log(this.mail);
      console.log(this.password);
      this.navCtrl.setRoot('HomePage');
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }

  doSignUp() {
    this.navCtrl.push('SignUpPage');
  }

  callRestore() {
    this.navCtrl.push('RestorePasswordPage');
  }
}
