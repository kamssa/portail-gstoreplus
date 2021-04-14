import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TerrainService} from "../service/terrain.service";
import {VilleService} from "../service/ville.service";
import {LocalStorage} from "@ngx-pwa/local-storage";
import {FlashService} from "../service/flash.service";
import {Terrain} from "../models/Terrain";
import {FlashTerrain} from "../models/FlashTerrain";
import {Ville} from "../models/Ville";
import {Membre} from "../models/Membre";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{
  terrains: Terrain[];
  terrainsVille: Terrain[];
  flasTerrains: FlashTerrain[];
  villes: Ville[];
  edit: boolean;
  membre: Membre;
  public modeselect = 'Tous';
  villeId: any;
  item: number;
  constructor(
              private terrainService: TerrainService,
              private router: Router,
              private villeService: VilleService,
              private localStorage: LocalStorage,
              private flashService: FlashService) {
  }

  ngOnInit(): void {
    this.flashService.getAllFlashTerrain().subscribe(res => {
      this.flasTerrains = res.body;
      console.log(this.flasTerrains);

    });
    this.terrainService.getAllTerrain().subscribe(res => {
      this.terrains = res.body;
      console.log(res.body);
    });

    this.villeService.getAllVille().subscribe(res => {
      this.villes = res.body;
      console.log(this.villes);

    });
  }
  activeCategorie(t: number) {
    var a = document.getElementById('deuxieme').children;
    for (let i=0; i <a.length; i++) {
      a[i].classList.remove('active');
      if (t == i) {
        a[t].classList.add('active');
      }
    }
  }

  onDetail(id: number) {
    console.log('Voir id', id);
    this.router.navigate(['detail', id]);

  }

  changeVille(value: any) {

  }



  onDemande(id: number) {
    this.router.navigate(['demande', id]);
  }
}
