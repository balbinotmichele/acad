import { Sessione } from './../../types/types';
import { ServiceDbAcadProvider } from './../../providers/service-db-acad/service-db-acad';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { TestDetailPage } from '../../pages/test-detail/test-detail';
import { SessionModalPage } from '../session-modal/session-modal';
import { VariabileIndipendente } from '../../types/types';

@Component({
  selector: 'tests-home',
  templateUrl: 'tests-home.html'
})
export class TestsHomeComponent implements OnInit{
  email : string;
  sessions : Sessione[];

  errmsg : string;

  constructor(private sd : ServiceDbAcadProvider, private modalCtrl : ModalController, private navCtrl : NavController, private alertCtrl : AlertController) {}

  ngOnInit() {
    this.email = JSON.parse(sessionStorage.getItem('User')).Email;
    this.sd.GetSessioni(this.email)
      .subscribe(res => {
        this.sessions = res
      },
      errorCode => this.errmsg = errorCode
    );
  }

  FormatData(date : string) : string {
    return new Date(date).toLocaleDateString();
  }

  OpenSession(session : Sessione) {
    this.sd.GetEsperimentoByCodice(session.CodEsperimento)
      .subscribe(res => {
        this.sd.GetVariabiliBySessione(session.CodSessione)
          .subscribe(res2 => {
            this.navCtrl.push('TestDetailPage', {session: session, exp: res[0], indieVar: res2});
          })
      });
  }

  NewSession() {
    const modal = this.modalCtrl.create(SessionModalPage, {enableBackdropDismiss: false });
    modal.present();

    modal.onDidDismiss((data) => {
      if(data != null) {
        let tmp : Sessione = new Sessione();
        tmp.DataCreazione = new Date().toISOString().slice(0, 19);
        tmp.NomeSessione = data.name;
        this.sd.GetEsperimentoByNome(data.exp, this.email)
          .subscribe(res => {
            tmp.CodEsperimento = res[0].CodEsperimento;
            this.sd.AddSessione(tmp)
              .subscribe(res2 => {
                let indieVar : VariabileIndipendente[] = JSON.parse(data.indie);
                this.sd.GetSessioneByNome(tmp.NomeSessione, this.email)
                  .subscribe(res3 => {
                    tmp = res3[0];
                    for(var i in indieVar) {
                      indieVar[i].CodSessione = res3[0].CodSessione;
                      this.sd.AddVariabile(indieVar[i])
                        .subscribe(res4 => {
                          this.ngOnInit();
                          this.navCtrl.push('TestDetailPage', {session: tmp, exp: res[0], indieVar: res4.data})
                        })
                    }
                  })

              })
          })
      }
    })
  }

  DeleteSession(session : Sessione, i : number)  {
    const confirm = this.alertCtrl.create({
      title: 'Delete the session',
      message: 'Are you sure you want to delete this session (along with the tests data)?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
          this.sd.DeleteSessione(session.CodSessione)
            .subscribe(res => {
              this.ngOnInit();
            },
            errorCode => this.errmsg = errorCode
          )
          }
        }
      ]
    });
    confirm.present();
  }
}
