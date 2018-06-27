export class Utente {
  Nome : string = "";
  Cognome : string = "";
  Email : string = "";

  constructor() {}
}

export class Soggetto {
  CodSoggetto : number = 0;
  NomeSoggetto : string = "";
  Descrizione : string = "";
  Email : string = "";

  constructor() {}
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

  constructor() {}
}

export class VariabileIndipendente {
  CodVariabile : number = 0;
  NomeVariabile : string = "";
  TipoVariabile : string = "";
  CodSessione : number = 0;

  constructor() {}
}

export class Posizione {
  CodPosizione : number = 0;
  NomePosizione : string = "";
  CodEsperimento : number = 0;

  constructor() {}
}

export class Stimolo {
  CodStimolo : number = 0;
  NomeStimolo : string = "";
  CodEsperimento : number = 0;

  constructor() {}
}

export class Sessione {
  CodSessione : number = 0;
  NomeSessione : string = "";
  DataCreazione : string = "";
  CodEsperimento : number = 0;

  constructor() {}
}

export class Test {
  CodSoggetto : number = 0;
  DataEsperimento : string = "";
  DataInserimento : string = "";
  PrimaScelta : string = "";
  Latenza : number = 0;
  Transizioni : number = 0;
  CodSessione : number = 0;

  constructor() {}
}

export class Orientato {
  CodSoggetto : number = 0;
  CodSessione : number = 0;
  CodOrientamento : number = 0;
  Tempo : number = 0;

  constructor() {}
}

export class Posizionato {
  CodSoggetto : number = 0;
  CodSessione : number = 0;
  CodPosizione : number = 0;
  Tempo : number = 0;

  constructor() {}
}

export class Stimolato {
  CodSoggetto : number = 0;
  CodSessione : number = 0;
  CodPosizione : number = 0;
  CodStimolo : number = 0;
  Tempo : number = 0;

  constructor() {}
}

export class Dipendato {
  CodSoggetto : number = 0;
  CodSessione : number = 0;
  CodVariabile : number = 0;
  Valore : string = "";

  constructor() {}
}

export class Bin {
  CodSoggetto : number = 0;
  CodSessione : number = 0;
  NumBin : number = 0;
  Note : string = "";

  constructor() {}
}

export class Data {
  NomeSoggetto : string = "";
  Descrizione : string = "";
  NomeEsperimento : string = "";
  DataEsperimento : string = "";
  Posizionato : PosData[] = [];
  Dipendato : DipData[] = [];
  Bin : BinData[] = [];
  Stimolato : StimData[] = [];
  Orientato : OriData[] = [];
  PrimaScelta : string ="";
  Latenza : number = 0;
  Transizioni : number = 0;
}

export class PosData {
  NomePosizione : string = "";
  Tempo : number = 0;
}

export class OriData {
  NomeOrientamento : string = "";
  Tempo : number = 0;
}

export class DipData {
  NomeVariabile : string = "";
  Valore : number = 0;
}

export class StimData {
  // NomePosizione : string = "";
  NomeStimolo : string = "";
  Tempo : number = 0;
}

export class BinData {
  NumBin : string = "";
  Note : number = 0;
}
