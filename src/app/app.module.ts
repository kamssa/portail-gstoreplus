import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import { DetailTerrainComponent } from './terrain/detail-terrain/detail-terrain.component';

import {JWT_OPTIONS, JwtHelperService, JwtInterceptor} from "@auth0/angular-jwt";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";

import {SuccessDialogComponent} from "./service/shared/dialogs/success-dialog/success-dialog.component";
import {ErrorDialogComponent} from "./service/shared/dialogs/error-dialog/error-dialog.component";
import {Ng2TelInputModule} from "ng2-tel-input";
import {AgmCoreModule} from "@agm/core";
import {FooterComponent} from "./footer/footer.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {DevisComponent} from "./devis/devis.component";
import {AproposComponent} from "./apropos/apropos.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {InvestissementComponent} from "./investissement/investissement.component";
import {BlogComponent} from "./blog/blog.component";
import {DetailBlogComponent} from "./detail-blog/detail-blog.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {AllTerrainComponent} from "./all-terrain/all-terrain.component";
import {AllImmobilierComponent} from "./all-immobilier/all-immobilier.component";
import {DemandeComponent} from "./demande/demande/demande.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DetailMaisonComponent} from "./maison/detail-maison/detail-maison.component";
import {MainModule} from "./main-page/main.module";
import {ErrorInterceptor} from "./helper/error.interceptor";
import {APP_DATE_FORMATS, AppDateAdapter} from "./helper/format-datepicker";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {RxStompService} from "@stomp/ng2-stompjs";
import {NgxGalleryModule} from "ngx-gallery-9";
import { DetailTerrainSComponent } from './terrain/detail-terrain-s/detail-terrain-s.component';
import { DetailTerraintComponent } from './terrain/detail-terraint/detail-terraint.component';
import { DetailFlashMaisonComponent } from './flashMaison/detail-flash-maison/detail-flash-maison.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PasswordOublieComponent } from './password-oublie/password-oublie.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DevisComponent,
    PageDetailComponent,
    AproposComponent,
    ContactsComponent,
    InvestissementComponent,
    BlogComponent,
    DetailBlogComponent,
    InscriptionComponent,
    ConnexionComponent,
    AllTerrainComponent,
    FooterComponent,
    AllImmobilierComponent,
    DetailTerrainComponent,
    DetailMaisonComponent,
    DemandeComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    DashboardComponent,
    DetailTerrainSComponent,
    DetailTerraintComponent,
    DetailFlashMaisonComponent,
    PasswordOublieComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2TelInputModule,
    FlexLayoutModule,
    NgxGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDb5zHByv4oTHfzrfc1rWuoNvqfNkjISw',

    }),
    MatMenuModule,
    Ng2TelInputModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
