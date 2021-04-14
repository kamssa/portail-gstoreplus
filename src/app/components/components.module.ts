import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BandeComponent} from './bande/bande.component';
import {MaterialModule} from "../material/material.module";
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    BandeComponent,
    SidebarComponent

  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        BandeComponent,
        SidebarComponent

    ]
})
export class ComponentsModule { }
