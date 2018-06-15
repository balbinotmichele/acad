import { ServiceDbAcadProvider } from './../../providers/service-db-acad/service-db-acad';
import { Component } from '@angular/core';
import { Sessione } from '../../types/types';

@Component({
  selector: 'tests-home',
  templateUrl: 'tests-home.html'
})
export class TestsHomeComponent {
  email : string;
  sessions : Sessione[];

  errmsg : string;

  constructor(private sd : ServiceDbAcadProvider) {
    this.email = sessionStorage.getItem('UserEmail');
    this.sd.GetSessioni(this.email)
      .subscribe(res => {
        this.sessions = res
      },
      errorCode => this.errmsg = errorCode
    );
  }

}
