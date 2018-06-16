import { Component } from '@angular/core';
import { ServiceDbAcadProvider } from '../../providers/service-db-acad/service-db-acad';

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
  email : string;
  hours : number;
  tests : number;
  experiments : number;
  sessions : number;

  constructor(private sd : ServiceDbAcadProvider) {
    let user = JSON.parse(sessionStorage.getItem("User"));
    this.email = (user == undefined || user == null ? "" : JSON.parse(sessionStorage.getItem("User")).Email);
    // this.email = sessionStorage.getItem("UserEmail")   || "";
    this.sd.GetOreEsperimenti(this.email)
      .subscribe(res => {
        this.hours = res[0].OreEsperimenti;
      });

    this.sd.GetNumeroTest(this.email)
      .subscribe(res => {
        this.tests = res[0].NumeroTest;
      });

    this.sd.GetNumeroEsperimenti(this.email)
      .subscribe(res => {
        this.experiments = res[0].NumeroEsperimenti;
      });

    this.sd.GetNumeroSessioni(this.email)
      .subscribe(res => {
        this.sessions = res[0].NumeroSessioni;
      });
  }
}
