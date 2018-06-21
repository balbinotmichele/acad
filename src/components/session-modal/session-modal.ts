import { VariabileIndipendente } from './../../types/types';
import { Component, OnInit } from "@angular/core";
import { ViewController } from "ionic-angular";
import { ServiceDbAcadProvider } from "../../providers/service-db-acad/service-db-acad";
import { Esperimento } from "../../types/types";

@Component({
  selector: 'session-modal',
  templateUrl: 'session-modal.html'
})
export class SessionModalPage implements OnInit {
exp: Esperimento;
nomeSessione : string = "";

expList : Esperimento[];

indieVar : VariabileIndipendente[] = [new VariabileIndipendente()];

disableStart = this.nomeSessione == '' || this.exp == undefined || (this.indieVar.length > 0 && (this.indieVar.map(x => x.NomeVariabile).indexOf('') >= 0 || this.indieVar.map(x => x.TipoVariabile).indexOf('') >= 0));

constructor(private viewCtrl : ViewController, private sd : ServiceDbAcadProvider) {}

ngOnInit(): void {
  this.sd.GetEsperimenti(JSON.parse(sessionStorage.getItem("User")).Email)
    .subscribe(res => {
      this.expList = res;
    })
}

DisableStart() : boolean {
  return this.nomeSessione == '' || this.exp == undefined || (this.indieVar.length > 0 && (this.indieVar.map(x => x.NomeVariabile).indexOf('') >= 0 || this.indieVar.map(x => x.TipoVariabile).indexOf('') >= 0));
}

NewVariable() {
  this.indieVar.push(new VariabileIndipendente());
}

Cancel() {
  this.viewCtrl.dismiss()
}

Start() {
  this.viewCtrl.dismiss({
    exp : this.exp,
    name : this.nomeSessione,
    indie : JSON.stringify(this.indieVar)
  })
}
}
