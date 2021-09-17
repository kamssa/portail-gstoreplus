import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {JWT_OPTIONS, JwtHelperService, JwtInterceptor} from "@auth0/angular-jwt";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {Ng2TelInputModule} from "ng2-tel-input";
import {AgmCoreModule} from "@agm/core";
import {ErrorInterceptor} from "./helper/error.interceptor";
import {APP_DATE_FORMATS, AppDateAdapter} from "./helper/format-datepicker";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {RxStompService} from "@stomp/ng2-stompjs";
import {NgxGalleryModule} from "ngx-gallery-9";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {LayoutModule} from "./layout/layout/layout.module";
import {LayoutComponent} from "./layout/layout/layout.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { DemandeTerrainComponent } from './demande/demande-terrain/demande-terrain.component';
import { DemandeMaisonComponent } from './demande/demande-maison/demande-maison.component';
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";



registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainPageComponent,
    DemandeTerrainComponent,
    DemandeMaisonComponent,
    ConnexionComponent,
    InscriptionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2TelInputModule,
    FlexLayoutModule,
    NgxGalleryModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDb5zHByv4oTHfzrfc1rWuoNvqfNkjISw',

    }),
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
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
