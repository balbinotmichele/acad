import firebase from 'firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'dash',
  templateUrl: 'dash.html'
})
export class DashComponent {

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
}
