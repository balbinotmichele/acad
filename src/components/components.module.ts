import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu";
import { DashComponent } from "./dash/dash";
import { CountersComponent } from './counters/counters';
import { CardsComponent } from './cards/cards';
import { TestsHomeComponent } from './tests-home/tests-home';

@NgModule({
  declarations: [
    MenuComponent,
    DashComponent,
    CountersComponent,
    CardsComponent,
    TestsHomeComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    MenuComponent,
    DashComponent,
    CountersComponent,
    CardsComponent,
    TestsHomeComponent
  ]

  })
  export class ComponentsModule {}
