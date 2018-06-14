import firebase from 'firebase';
import { Component, OnInit, Output } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Utente } from '../../types/types';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Output() user : Utente;

  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.user = navParams.get('user');
    // console.log(navParams.get('user'));

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      } else {
        navCtrl.setRoot('WelcomePage');
      }
    });
  }
}
