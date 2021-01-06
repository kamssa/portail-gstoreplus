import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AProposComponent } from 'src/app/Pages/a-propos/a-propos.component';
import { AccueilComponent } from 'src/app/Pages/accueil/accueil.component';


const routes: Routes = [
  { path: 'accueil',component: AccueilComponent},
  { path: 'propos',component: AProposComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
