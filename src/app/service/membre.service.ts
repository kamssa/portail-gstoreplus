import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import {Membre} from "../models/Membre";

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private clientCreerSource = new Subject<Resultat<Membre>>();
  private clientModifSource = new Subject<Resultat<Membre>>();
  private clientFiltreSource = new Subject<string>();
  private clientSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  clientCreer$ = this.clientCreerSource.asObservable();
  clientModif$ = this.clientModifSource.asObservable();
  clientFiltre$ = this.clientFiltreSource.asObservable();
  clientSupprime$ = this.clientSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllMembre(): Observable<Resultat<Membre[]>> {
    return this.http.get<Resultat<Membre[]>>(`${environment.apiUrl}/api/auth/employe`);
  }
  registraction(membre: Membre, action: string): Observable<Resultat<Membre>> {
    console.log('methode du service qui ajoute un membre', membre);
    return this.http.post<Resultat<Membre>>(`${environment.apiUrl}/api/auth/signupM/?action=${action}`, membre);
  }
  registractionConfirm(email: string, code: number): Observable<Resultat<Membre>> {
    console.log('methode du service qui ajoute un membre', email);
    return this.http.get<Resultat<Membre>>(`${environment.apiUrl}/api/auth/registrationConfirmM/?email=${email}&code=${code}`);
  }
  ajoutMembre(membre: Membre): Observable<Resultat<Membre>> {
    console.log('methode du service qui ajoute un client', membre);
    return this.http.post<Resultat<Membre>>(`${environment.apiUrl}/api/auth/signupEmpl`, membre);
  }
  getMembreById(id: number): Observable<Resultat<Membre>> {
    return this.http.get<Resultat<Membre>>(`${environment.apiUrl}/api/membre/${id}`);
  }
  getMembreByEmail(email: string): Observable<Resultat<Membre>> {
    return this.http.get<Resultat<Membre>>(`${environment.apiUrl}/api/getMembre/${email}`);
  }
  membreCreer(res: Resultat<Membre>) {
    console.log('Membre a ete  creer correctement essaie source');
    this.clientCreerSource.next(res);
  }

  membreModif(res: Resultat<Membre>) {
    this.clientModifSource.next(res);
  }

  filtreMembre(text: string) {
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
