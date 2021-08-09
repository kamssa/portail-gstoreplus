import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {environment} from '../../environments/environment.prod';
import {ImageDetail} from '../models/ImageDetail';
import {DetailTerrain} from '../models/DetailTerrain';
import {DetailMaison} from "../models/DetailMaison";

@Injectable({
  providedIn: 'root'
})
export class DetailMaisonService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDetailMaison(): Observable<Resultat<DetailMaison[]>> {
    return this.http.get<Resultat<DetailMaison[]>>(`${environment.apiUrl}/api/detailMaison`);
  }


  getDetailMaisonByIdMaison(id: number): Observable<Resultat<DetailTerrain>> {
    return this.http.get<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailMaisonByIdMaison/${id}`);
  }
  getDetailMaisonById(id: number): Observable<Resultat<DetailTerrain>> {
    return this.http.get<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailMaison/${id}`);
  }
  getImageDetailMaisonByIdDetailMaison(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailMaison/${id}`);
  }
}
