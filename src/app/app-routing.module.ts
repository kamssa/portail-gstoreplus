import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {PageNotFoundComponentComponent} from "./page-not-found-component/page-not-found-component.component";
import {LayoutComponent} from "./layout/layout/layout.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {AproposComponent} from "./apropos/apropos.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DemandeComponent} from "./demande/demande/demande.component";
import {DetailFlashMaisonComponent} from "./flashMaison/detail-flash-maison/detail-flash-maison.component";
import {DetailMaisonComponent} from "./maison/detail-maison/detail-maison.component";
import {DetailTerrainComponent} from "./terrain/detail-terrain/detail-terrain.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {InvestissementComponent} from "./investissement/investissement.component";
import {DetailBlogComponent} from "./detail-blog/detail-blog.component";
import {AllImmobilierComponent} from "./all-immobilier/all-immobilier.component";
import {AllTerrainComponent} from "./all-terrain/all-terrain.component";
import {BlogComponent} from "./blog/blog.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {DevisComponent} from "./devis/devis.component";
import {PageDetailComponent} from "./page-detail/page-detail.component";


const routes: Routes = [
  { path: '',   redirectTo: '/portail', pathMatch: 'full' },
  { path: 'portail', component: MainPageComponent },
  { path: '', component: LayoutComponent,
  children: [
    {path: 'accueil', component: AccueilComponent},
    { path: 'a-propos', component: AproposComponent },
    { path: 'devis', component: DevisComponent },
    { path: 'page-detail', component: PageDetailComponent },
    { path: 'a-propos', component: AproposComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'foncier', component: AllTerrainComponent },
    { path: 'immobilier', component: AllImmobilierComponent },
    { path: 'detail-blog', component: DetailBlogComponent },
    { path: 'investissement', component: InvestissementComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'connexion', component: ConnexionComponent },
    {path: 'detailTerrain/:id' , component: DetailTerrainComponent},
    {path: 'detailMaison/:id' , component: DetailMaisonComponent},
    {path: 'detailFlashMaison/:id' , component: DetailFlashMaisonComponent},
    { path: 'demande/:id', component: DemandeComponent},
    { path: 'dashboard/:id',
      component: DashboardComponent,
      canActivate: [
        AuthGuardService
      ]}
   ]},
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
