import { ServiceDbAcadProvider } from './../../providers/service-db-acad/service-db-acad';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';

import firebase from "firebase";
import { Utente } from '../../types/types';
import { empty } from 'rxjs/Observer';
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  styles: ['welcome.scss']
})
export class WelcomePage {
  mail:string;
  password: string;

  user : Utente;

  tmp:boolean = false;

  errmsg : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sd : ServiceDbAcadProvider) {

  }

  doLogin() {
    firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(() => {
      this.sd.GetUtenteByEmail(this.mail)
        .subscribe(res => {
          this.user = res[0];
          sessionStorage.setItem('UserName', this.user.Nome);
          sessionStorage.setItem('UserSurname', this.user.Cognome);
          sessionStorage.setItem('UserEmail', this.user.Email);

          this.navCtrl.setRoot('HomePage', {user: this.user});
        },
        errorCode => this.errmsg = errorCode
      );
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
