import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { BlogComponent } from './blog/blog.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';
import { DevisComponent } from './devis/devis.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { InvestissementComponent } from './investissement/investissement.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { AllTerrainComponent } from './all-terrain/all-terrain.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AllImmobilierComponent } from './all-immobilier/all-immobilier.component';
import {DetailTerrainComponent} from "./terrain/detail-terrain/detail-terrain.component";
import {DemandeComponent} from "./demande/demande/demande.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {DetailFlashMaison} from "./models/DetailFlashMaison";
import {DetailFlashMaisonComponent} from "./flashMaison/detail-flash-maison/detail-flash-maison.component";
import {DetailMaison} from "./models/DetailMaison";
import {DetailMaisonComponent} from "./maison/detail-maison/detail-maison.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'portail',
    pathMatch: 'full',
  },
  {
    path: 'portail',
    component: MainPageComponent,
    children:[
      {
        path:'portail',
        loadChildren: () => import('./main-page/main.module').then(m => m.MainModule)
      },

    ]
  },
  { path: 'accueil', component: AccueilComponent },
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
