import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MainPageComponent } from "./main-page.component";
import { MainRoutingModule } from "./main-routing.module";
import { AcceuilComponent } from './acceuil/acceuil.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MainRoutingModule
    ],
    declarations: [ MainPageComponent, AcceuilComponent ]
  })
  export class MainModule { }
  