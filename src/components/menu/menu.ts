import { Utente } from './../../types/types';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  user : Utente = new Utente();
  constructor(private navCtrl : NavController, public navParams : NavParams, public popoverCtrl: PopoverController) {
    this.user.Nome = sessionStorage.getItem('UserName');
    this.user.Cognome = sessionStorage.getItem('UserSurname');
    this.user.Email = sessionStorage.getItem('UserEmail');
  }

  LogOut() {
    firebase.auth().signOut().then(() => {
      console.log("logout")
      this.navCtrl.setRoot('WelcomePage');
    })
  }
}
