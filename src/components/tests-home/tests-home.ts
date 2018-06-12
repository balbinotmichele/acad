import { Component } from '@angular/core';

/**
 * Generated class for the TestsHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tests-home',
  templateUrl: 'tests-home.html'
})
export class TestsHomeComponent {

  text: string;

  constructor() {
    console.log('Hello TestsHomeComponent Component');
    this.text = 'Hello World';
  }

  method() {
    alert("asd");
  }

}
