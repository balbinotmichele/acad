import { DateTime } from "ionic-angular/umd";

export class Utente {
  CodUtente : number;
  Nome : string;
  Cognome : string;
  Email : string;

  constructor() {}
}

export class Soggetto {
  CodSoggetto : number;
  NomeSoggetto : string;
  Descrizione : string;
  CodUtente : number;

  constructor() {}
}

export class Esperimento {
  CodEsperimento : number;
  NomeEsperimento : string;
  NumeroBin : number;
  DurataBin: number;
  PrimaScelta : boolean;
  Latenza : boolean;
  Transizioni : boolean;
  Forma : string;
  CodUtente : number;

  constructor() {}
}

export class Orientamento {
  CodOrientamento : number;
  NomeOrientamento : string;
  CodEsperimento : number;
  CodUtente : number;

  constructor() {}
}

export class VariabileIndipendente {
  CodVariabile : number;
  NomeVariabile : string;
  TipoVariabile : string;
  CodUtente : number;

  constructor() {}
}

export class Posizione {
  CodPosizione : number;
  NomePosizione : string;
  CodEsperimento : number;
  CodUtente : number;

  constructor() {}
}

export class Stimolo {
  CodStimolo : number;
  NomeStimolo : string;
  CodEsperimento : number;
  CodUtente : number;

  constructor() {}
}

export class Sessione {
  CodSessione : string;
  DataCreazione : DateTime;
  CodUtente : number;

  constructor() {}
}

export class Test {
  CodSoggetto : number;
  CodEsperimento : number;
  DataEsperimento : DateTime;
  DataInserimento : DateTime;
  PrimaScelta : string;
  Latenza : number;
  Transizioni : number;
  CodSessione : number;
  CodUtente : number;

  constructor() {}
}

export class Orientato {
  CodSoggetto : number;
  CodEsperimento : number;
  CodOrientamento : number;
  Tempo : number;
  CodUtente : number;

  constructor() {}
}

export class Posizionato {
  CodSoggetto : number;
  CodEsperimento : number;
  CodPosizione : number;
  Tempo : number;
  CodUtente : number;

  constructor() {}
}

export class Stimolato {
  CodSoggetto : number;
  CodEsperimento : number;
  CodPosizione : number;
  CodStimolo : number;
  CodUtente : number;

  constructor() {}
}

export class Dipendato {
  CodSoggetto : number;
  CodEsperimento : number;
  CodVariabile : number;
  Valore : string;
  CodUtente : number;

  constructor() {}
}

export class Bin {
  CodSoggetto : number;
  CodEsperimento : number;
  NumBin : number;
  Note : string;
  CodUtente : number;

  constructor() {}
}
