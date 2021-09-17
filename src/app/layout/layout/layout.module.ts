import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { LayoutRoutes} from './layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccueilComponent} from "../../accueil/accueil.component";
import {DevisComponent} from "../../devis/devis.component";
import {PageDetailComponent} from "../../page-detail/page-detail.component";
import {AproposComponent} from "../../apropos/apropos.component";
import {ContactsComponent} from "../../contacts/contacts.component";
import {BlogComponent} from "../../blog/blog.component";
import {DetailBlogComponent} from "../../detail-blog/detail-blog.component";
import {AllTerrainComponent} from "../../all-terrain/all-terrain.component";
import {AllImmobilierComponent} from "../../all-immobilier/all-immobilier.component";
import {DetailTerrainComponent} from "../../terrain/detail-terrain/detail-terrain.component";
import {DetailMaisonComponent} from "../../maison/detail-maison/detail-maison.component";
import {DemandeComponent} from "../../demande/demande/demande.component";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";
import {ErrorDialogComponent} from "../../service/shared/dialogs/error-dialog/error-dialog.component";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {DetailFlashMaisonComponent} from "../../flashMaison/detail-flash-maison/detail-flash-maison.component";
import {PasswordOublieComponent} from "../../password-oublie/password-oublie.component";
import {FooterComponent} from "../../composants/footer/footer.component";
import {NavbarComponent} from "../../composants/navbar/navbar.component";
import {MaterialModule} from "../../material/material.module";
import {InscriptionComponent} from "../../inscription/inscription.component";
import {ConnexionComponent} from "../../connexion/connexion.component";

@NgModule({
  declarations: [
    AccueilComponent,
    DevisComponent,
    PageDetailComponent,
    AproposComponent,
    ContactsComponent,
    BlogComponent,
    DetailBlogComponent,
    AllTerrainComponent,
    AllImmobilierComponent,
    DetailTerrainComponent,
    DetailMaisonComponent,
    DemandeComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    DashboardComponent,
    DetailFlashMaisonComponent,
    PasswordOublieComponent,
    FooterComponent,
    NavbarComponent,

  ],
  exports: [
    AccueilComponent,
    DevisComponent,
    PageDetailComponent,
    AproposComponent,
    ContactsComponent,
    BlogComponent,
    DetailBlogComponent,
    AllTerrainComponent,
    AllImmobilierComponent,
    DetailTerrainComponent,
    DetailMaisonComponent,
    DemandeComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    DashboardComponent,
    DetailFlashMaisonComponent,
    PasswordOublieComponent,
    FooterComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class LayoutModule { }
