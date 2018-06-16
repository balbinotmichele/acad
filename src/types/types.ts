import { DateTime } from "ionic-angular/umd";

export class Utente {
  Nome : string = "";
  Cognome : string = "";
  Email : string = "";

  constructor() {
    this.Nome = "";
    this.Cognome = "";
    this.Email = "";
  }
}

export class Soggetto {
  CodSoggetto : number = 0;
  NomeSoggetto : string = "";
  Descrizione : string = "";
  Email : string = "";

  constructor() {

  }
}

export class Esperimento {
  CodEsperimento : number = 0;
  NomeEsperimento : string = "";
  NumeroBin : number = 0;
  DurataBin: number = 0;
  PrimaScelta : boolean  = false;
  Latenza : boolean = false;
  Transizioni : boolean = false;
  Forma : string = "";
  MostraPosizioni : boolean = false;
  Email : string = "";

  constructor() {}
}

export class Orientamento {
  CodOrientamento : number = 0;
  NomeOrientamento : string = "";
  CodEsperimento : number = 0;
  Email : string = "";

  constructor() {
    this.CodOrientamento = 0;
    this.NomeOrientamento = "";
  }
}

export class VariabileIndipendente {
  CodVariabile : number = 0;
  NomeVariabile : string = "";
  TipoVariabile : string = "";
  Email : string = "";

  constructor() {}
}

export class Posizione {
  CodPosizione : number = 0;
  NomePosizione : string = "";
  CodEsperimento : number = 0;
  Email : string = "";

  constructor() {
    this.CodPosizione = 0;
    this.NomePosizione = "";
  }
}

export class Stimolo {
  CodStimolo : number = 0;
  NomeStimolo : string = "";
  CodEsperimento : number = 0;
  Email : string = "";

  constructor() {
    this.CodStimolo = 0;
    this.NomeStimolo = "";
  }
}

export class Sessione {
  CodSessione : string = "";
  DataCreazione : string = "";
  Email : string = "";

  constructor() {}
}

export class Test {
  CodSoggetto : number = 0;
  CodEsperimento : number = 0;
  DataEsperimento : string = "";
  DataInserimento : string = "";
  PrimaScelta : string = "";
  Latenza : number = 0;
  Transizioni : number = 0;
  CodSessione : number = 0;
  Email : string = "";

  constructor() {}
}

export class Orientato {
  CodSoggetto : number = 0;
  CodEsperimento : number;
  CodOrientamento : number;
  Tempo : number = 0;
  Email : string = "";

  constructor() {}
}

export class Posizionato {
  CodSoggetto : number = 0;
  CodEsperimento : number = 0;
  CodPosizione : number = 0;
  Tempo : number = 0;
  Email : string = "";

  constructor() {}
}

export class Stimolato {
  CodSoggetto : number = 0;
  CodEsperimento : number = 0;
  CodPosizione : number = 0;
  CodStimolo : number = 0;
  Email : string = "";

  constructor() {}
}

export class Dipendato {
  CodSoggetto : number = 0;
  CodEsperimento : number = 0;
  CodVariabile : number = 0;
  Valore : string = "";
  Email : string = "";

  constructor() {}
}

export class Bin {
  CodSoggetto : number = 0;
  CodEsperimento : number = 0;
  NumBin : number = 0;
  Note : string = "";
  Email : string = "";

  constructor() {}
}
