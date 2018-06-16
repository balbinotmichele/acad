import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { DashComponent } from "./dash/dash";
import { CountersComponent } from './counters/counters';
import { CardsComponent } from './cards/cards';
import { TestsHomeComponent } from './tests-home/tests-home';
import { ExperimentsHomeComponent } from './experiments-home/experiments-home';
import { MenuComponent } from "./menu/menu";
import { SessionModalPage } from './session-modal/session-modal';

@NgModule({
  declarations: [
    MenuComponent,
    DashComponent,
    CountersComponent,
    CardsComponent,
    TestsHomeComponent,
    ExperimentsHomeComponent,
    SessionModalPage
  ],
  imports: [
    IonicModule
  ],
  entryComponents : [
    SessionModalPage
  ],
  exports: [
    MenuComponent,
    DashComponent,
    CountersComponent,
    CardsComponent,
    TestsHomeComponent,
    ExperimentsHomeComponent,
    SessionModalPage
  ]

  })
  export class ComponentsModule {}
