import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  constructor(private navCtrl : NavController) {}

  LogOut() {
    firebase.auth().signOut().then(() => {
      console.log("logout")
      this.navCtrl.setRoot('WelcomePage');
    })
  }
}
