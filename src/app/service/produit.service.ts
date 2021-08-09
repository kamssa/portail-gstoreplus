import { Injectable } from '@angular/core';
import {Produit} from "../models/Produit";
import {Resultat} from "../models/resultat";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
// Observable string source
  private dataStringSource = new Subject<any>();

  // Observable string stream
  dataString$ = this.dataStringSource.asObservable();
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  public setData(value) {
    this.dataStringSource.next(value);
  }
  getAllProduit(): Observable<Resultat<Produit[]>> {
    return this.http.get<Resultat<Produit[]>>(`${environment.apiUrl}/api/produit`);
  }
  getProduitById(id: number): Observable<Resultat<Produit>> {
    return this.http.get<Resultat<Produit>>(`${environment.apiUrl}/api/produit/${id}`);
  }
  recherche(type: string, libelle: string, prix: number): Observable<Resultat<Produit[]>> {

    return this.http.get<Resultat<Produit[]>>(`${environment.apiUrl}/api/recherche/?type=${type}&libelle=${libelle}&prix=${prix}`);
  }
}
