import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu";
import { DashComponent } from "./dash/dash";

@NgModule({
    declarations: [
      MenuComponent,
      DashComponent
    ],
    imports: [
      IonicModule
    ],
    exports: [
      MenuComponent,
      DashComponent
    ]

  })
  export class ComponentsModule {}
