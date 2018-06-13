import { Component } from '@angular/core';

/**
 * Generated class for the ExperimentsHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'experiments-home',
  templateUrl: 'experiments-home.html'
})
export class ExperimentsHomeComponent {

  text: string;

  constructor() {
    console.log('Hello ExperimentsHomeComponent Component');
    this.text = 'Hello World';
  }

}
