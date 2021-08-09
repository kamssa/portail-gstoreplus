import { Component, OnInit } from '@angular/core';
import {TerrainService} from "../service/terrain.service";
import {Terrain} from "../models/Terrain";
import {Produit} from "../models/Produit";
import {Maison} from "../models/Maison";
import {MaisonService} from "../service/maison.service";
import {Router} from "@angular/router";
import {Personne} from "../models/Personne";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientService} from "../service/client.service";
import {AuthService} from "../service/auth.service";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
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
       console.log(res.body);
       this.terrains = res.body;
      });
    this.maisonService.getAllMaison()
      .subscribe(data => {
      this.maisons = data.body;
      console.log('maison', this.maisons);
      });
    this.flashMaisonService.getAllFlashMaison()
      .subscribe( data => {
       this.flashMaisons = data.body;
      });

  }

  onDetailMaison(id: any): void {
    console.log('Voir id', id);
    this.router.navigate(['detailMaison', id]);
         /*this._snackBar.open('Bientôt disponible!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
*/
  }
  onDetailTerrain(id: number) {
    console.log('Voir id', id);
    this.router.navigate(['detailTerrain', id]);
  }
  onDetailFlasMaison(id: number) {
    console.log('Voir id', id);
    this.router.navigate(['detailFlashMaison', id]);
  }
  getCurrentUser(){
    if (localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      let decode = this.helper.decodeToken(token);
      console.log(' Dans la navbar', decode);
      this.clientService.getClientById(decode.sub).subscribe(res => {
        console.log('admin', res.body);
        this.personne = res.body;
        this.nom = this.personne.nom;
        this.premierC = this.nom.substr(0, 1);
      });

    }
  }


}
