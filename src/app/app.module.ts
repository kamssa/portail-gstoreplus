import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {LayoutModule} from './layout/layout/layout.module';
import { TerrainComponent } from './terrain/terrain/terrain.component';
import { TerrainDetailComponent } from './terrain/terrain-detail/terrain-detail.component';
import { ImmobilierComponent } from './immobilier/immobilier/immobilier.component';
import {AccueilComponent} from './accueil/accueil.component';
import { BlogComponent } from './blog/blog/blog.component';
import { AccountComponent } from './account/account/account.component';
import { ConnexionComponent } from './account/connexion/connexion.component';
import { RegistryComponent } from './account/registry/registry.component';
import { DemandeComponent } from './demande/demande/demande.component';
import { ListeTerrainComponent } from './terrain/liste-terrain/liste-terrain.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DetailTerrainComponent } from './terrain/detail-terrain/detail-terrain.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { VerificationComponent } from './demande/verification/verification.component';
import { VilleComponent } from './ville/ville.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./helper/jwt.interceptor";
import {ErrorInterceptor} from "./helper/error.interceptor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "./helper/format-datepicker";
import { CreateCompteComponent } from './account/create-compte/create-compte.component';
import { VerificationRegisterComponent } from './verification-register/verification-register.component';
import { AproposComponent } from './apropos/apropos.component';
import { TerrainVilleComponent } from './terrain/terrain-ville/terrain-ville.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { AllterrainComponent } from './terrain/allterrain/allterrain.component';
import { ContactComponent } from './contact/contact.component';
import { DemandeDevidComponent } from './demande-devid/demande-devid.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import { SidebarComponent } from './sidebar/sidebar.component';
import { InvestissementComponent } from './investissement/investissement.component';
import {AgmCoreModule} from "@agm/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FoncierComponent} from "./foncier/foncier/foncier.component";
import { LoginComponent } from './account/login/login.component';
import { MonDashboardComponent } from './mon-dashboard/mon-dashboard.component';
import { MainModule } from './main-page/main.module';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    TerrainComponent,
    TerrainDetailComponent,
    ImmobilierComponent,
    AccueilComponent,
    BlogComponent,
    AccountComponent,
    ConnexionComponent,
    RegistryComponent,
    DemandeComponent,
    ListeTerrainComponent,
    DetailTerrainComponent,
    VerificationComponent,
    VilleComponent,
    CreateCompteComponent,
    VerificationRegisterComponent,
    AproposComponent,
    TerrainVilleComponent,
    ActualiteComponent,
    AllterrainComponent,
    ContactComponent,
    DemandeDevidComponent,
    SidebarComponent,
    InvestissementComponent,
    DashboardComponent,
    FoncierComponent,
    LoginComponent,
    MonDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MainModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAz8F_idsjwsYcICFfDXhtDPpUS1ZpXsz4',
      libraries: ['places']
    })


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
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
