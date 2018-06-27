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
  @Output() dataChange: EventEmitter<boolean> = new EventEmitter();

  @Output() logout: EventEmitter<boolean> = new EventEmitter();

  user : Utente = new Utente();

  constructor(private navCtrl : NavController, public navParams : NavParams) {
    this.user = JSON.parse(sessionStorage.getItem('User'));
    this.user = (this.user == undefined || this.user == null ? new Utente : JSON.parse(sessionStorage.getItem('User')));
  }
}
