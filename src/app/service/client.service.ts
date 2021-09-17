import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Client} from "../models/Client";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import {Personne} from "../models/Personne";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientCreerSource = new Subject<Resultat<Client>>();
  private clientModifSource = new Subject<Resultat<Client>>();
  private clientFiltreSource = new Subject<string>();
  private clientSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  clientCreer$ = this.clientCreerSource.asObservable();
  clientModif$ = this.clientModifSource.asObservable();
  clientFiltre$ = this.clientFiltreSource.asObservable();
  clientSupprime$ = this.clientSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllClient(): Observable<Resultat<Client[]>> {
    return this.http.get<Resultat<Client[]>>(`${environment.apiUrl}/api/auth/employe`);
  }
  registraction(personne: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui ajoute un client', personne);
    return this.http.post<Resultat<Personne>>(`${environment.apiUrl}/api/auth/signuc/`, personne);
  }
  ajoutClient(client: Client): Observable<Resultat<Client>> {
    console.log('methode du service qui ajoute un client', client);
    return this.http.post<Resultat<Client>>(`${environment.apiUrl}/api/auth/signupEmpl`, client);
  }
  passworClientMofif(client: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui ajoute un client', client);
    return this.http.put<Resultat<Personne>>(`${environment.apiUrl}/api/auth/updatePassword`, client);
  }
  getClientById(id: Client): Observable<Resultat<Client>> {
    return this.http.get<Resultat<Client>>(`${environment.apiUrl}/api/auth/client/${id}`);
  }
  getClientByEmail(email: string): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/getClient/${email}`);
  }
  clientCreer(res: Resultat<Client>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.clientCreerSource.next(res);
  }

  employeModif(res: Resultat<Client>) {
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
