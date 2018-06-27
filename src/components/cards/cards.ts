import { NavController } from 'ionic-angular';
import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the CardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cards',
  templateUrl: 'cards.html'
})
export class CardsComponent {
  @Output() testClick : EventEmitter<boolean> = new EventEmitter();
  @Output() expClick : EventEmitter<boolean> = new EventEmitter();
  @Output() dataClick : EventEmitter<boolean> = new EventEmitter();

  constructor(public navCtrl : NavController) {}
}
