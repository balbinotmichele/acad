import { Component } from '@angular/core';

/**
 * Generated class for the CountersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'counters',
  templateUrl: 'counters.html'
})
export class CountersComponent {

  text: string;

  constructor() {
    console.log('Hello CountersComponent Component');
    this.text = 'Hello World';
  }

}
