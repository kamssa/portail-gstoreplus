import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from 'src/app/Pages/accueil/accueil.component';
import { AProposComponent } from 'src/app/Pages/a-propos/a-propos.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';


@NgModule({
  declarations: [
    AccueilComponent,
    AProposComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule
  ]
})
export class AdminLayoutModule { }
