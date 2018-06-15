import { Utente } from './../../types/types';
import { NavController, NavParams } from 'ionic-angular';
import { Component, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  @Output() testChange: EventEmitter<boolean> = new EventEmitter();
  @Output() cardChange: EventEmitter<boolean> = new EventEmitter();
  @Output() experimentChange: EventEmitter<boolean> = new EventEmitter();

  @Output() logout: EventEmitter<boolean> = new EventEmitter();

  user : Utente = new Utente();

  constructor(private navCtrl : NavController, public navParams : NavParams) {
    this.user.Nome = sessionStorage.getItem('UserName') || "";
    this.user.Cognome = sessionStorage.getItem('UserSurname') || "";
    this.user.Email = sessionStorage.getItem('UserEmail') || "";
  }
}
