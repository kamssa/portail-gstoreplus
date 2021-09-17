import { Component, OnInit } from '@angular/core';
import {TerrainService} from "../service/terrain.service";
import {Produit} from "../models/Produit";
import {Maison} from "../models/Maison";
import {MaisonService} from "../service/maison.service";
import {Router} from "@angular/router";
import {Personne} from "../models/Personne";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientService} from "../service/client.service";
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FlashMaisonService} from "../service/flash-maison.service";
import {FlashMaison} from "../models/FlashMaison";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
terrains: Produit[];
maisons: Maison[];
flashMaisons: FlashMaison[];
  personne: Personne;
  nom: string;
  premierC: string;
  constructor(private terrainService: TerrainService,
              private  maisonService: MaisonService,
              private flashMaisonService: FlashMaisonService,
              private  router: Router,
              private helper: JwtHelperService,
              private  clientService: ClientService,
              private  authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.refreshNeeded.subscribe(() =>{
      this.getCurrentUser();

    });
    this.getCurrentUser();
    this.terrainService.getAllTerrainAbidjan()
      .subscribe(res => {
       this.terrains = res.body;
      });
    this.maisonService.getAllMaison()
      .subscribe(data => {
      this.maisons = data.body;
      });
    this.flashMaisonService.getAllFlashMaison()
      .subscribe( data => {
       this.flashMaisons = data.body;
      });

  }


  getCurrentUser(){
    if (localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      let decode = this.helper.decodeToken(token);
      this.clientService.getClientById(decode.sub).subscribe(res => {
        if (res.body!=null){
          this.personne = res.body;
          this.nom = this.personne.nom;
          this.premierC = this.nom.substr(0, 1);
        }

      });

    }
  }


  voirTerrain() {
    this.router.navigate(['foncier']);
  }

  voirMaison() {
    this.router.navigate(['immobilier'])
  }
}
