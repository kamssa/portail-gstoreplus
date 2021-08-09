import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Terrain} from '../models/Terrain';
import {MessageService} from './message.service';
import {Produit} from "../models/Produit";

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
// observables sources


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTerrainAbidjan(): Observable<Resultat<Produit[]>> {
    return this.http.get<Resultat<Produit[]>>(`${environment.apiUrl}/api/terrain`);
  }

  ajoutTerrain(terrain: Terrain): Observable<Resultat<Terrain>> {
    console.log('methode du service qui ajoute  terrain', terrain);
    return this.http.post<Resultat<Terrain>>(`${environment.apiUrl}/api/terrain`, terrain);
  }
  modifTerrain(terrain: Terrain): Observable<Resultat<Terrain>> {
    console.log('methode du service qui modifier terrain', terrain);
    return this.http.put<Resultat<Terrain>>(`${environment.apiUrl}/api/terrain`, terrain);
  }


  getTerrainById(id: number): Observable<Resultat<Terrain>> {
    return this.http.get<Resultat<Terrain>>(`${environment.apiUrl}/api/terrain/${id}`);
  }
  getTerrainByIdVille(id: number): Observable<Resultat<Terrain[]>> {
    return this.http.get<Resultat<Terrain[]>>(`${environment.apiUrl}/api/getTerrainByIdVille/${id}`);
  }
  supprimerTerrain(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/terrain/${id}`);

  }
  uploadImage(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/imageTerrain/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  ///////////////////////////////////////////
  // recuper les erreurs

}
