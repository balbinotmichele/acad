import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from "firebase";
import { Utente } from '../../types/types';
import { ServiceDbAcadProvider } from '../../providers/service-db-acad/service-db-acad';
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
  user : Utente = new Utente();

  name:string;
  surname:string;
  mail:string;
  password: string;

  view:boolean = true;

  errmsg : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sd : ServiceDbAcadProvider) {}

  Create() {
    this.user.Nome = this.name;
    this.user.Cognome = this.surname;
    this.user.Email = this.mail;

    this.sd.AddUtente(this.user)
    .subscribe(res =>
      {
        this.user = res;
        firebase.auth().createUserWithEmailAndPassword(this.mail, this.password).then(() => {
          this.navCtrl.setRoot('WelcomePage');
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
      },
      errorCode => this.errmsg = errorCode
    );
  }

}
