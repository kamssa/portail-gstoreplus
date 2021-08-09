import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Client} from "../models/Client";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import {Prospect} from "../models/Prospect";
import {Reponse} from "../models/reponse";
import {Membre} from "../models/Membre";

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private clientCreerSource = new Subject<Resultat<Prospect>>();
  private clientModifSource = new Subject<Resultat<Prospect>>();
  private clientFiltreSource = new Subject<string>();
  private clientSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  clientCreer$ = this.clientCreerSource.asObservable();
  clientModif$ = this.clientModifSource.asObservable();
  clientFiltre$ = this.clientFiltreSource.asObservable();
  clientSupprime$ = this.clientSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllClient(): Observable<Resultat<Prospect[]>> {
    return this.http.get<Resultat<Prospect[]>>(`${environment.apiUrl}/api/auth/employe`);
  }
  registraction(prospect: Prospect, action: string): Observable<Reponse<any, Prospect>> {
    console.log('methode du service qui ajoute un client', prospect);
    return this.http.post<Reponse<any, Prospect>>(`${environment.apiUrl}/api/auth/signupp/?action=${action}`, prospect);
  }
  registractionConfirm(email: string, code: number): Observable<Resultat<Membre>> {
    console.log('methode du service qui ajoute un membre', email);
    return this.http.get<Resultat<Membre>>(`${environment.apiUrl}/api/auth/registrationConfirmM/?email=${email}&code=${code}`);
  }
  ajoutClient(prospect: Prospect): Observable<Resultat<Prospect>> {
    console.log('methode du service qui ajoute un client', prospect);
    return this.http.post<Resultat<Prospect>>(`${environment.apiUrl}/api/auth/signupEmpl`, prospect);
  }
  getClientById(id: Client): Observable<Resultat<Prospect>> {
    return this.http.get<Resultat<Prospect>>(`${environment.apiUrl}/api/auth/employe/${id}`);
  }

  clientCreer(res: Resultat<Prospect>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.clientCreerSource.next(res);
  }

  employeModif(res: Resultat<Prospect>) {
    this.clientModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.clientFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('clientService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
