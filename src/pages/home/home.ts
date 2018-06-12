import firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
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

  LogOut() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('WelcomePage');
    })
  }
}
