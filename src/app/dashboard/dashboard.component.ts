import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Terrain} from "../models/Terrain";
import {Subscription} from "rxjs";
import {FlashTerrain} from "../models/FlashTerrain";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MediaObserver} from "@angular/flex-layout";
import {FlashService} from "../service/flash.service";
import {switchMap} from "rxjs/operators";
import {DemandeService} from "../service/demande.service";
import {Demande} from "../models/Demande";
import {TerrainAcheterService} from "../service/terrain-acheter.service";
import {TerrainAcheter} from "../models/TerrainAcheter";
import {Terrains} from "../models/Terrains";
import {Personne} from "../models/Personne";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  terrains: Terrains;
  terrainId: number;
  value = 'Clear me';
  private mediaSub: Subscription;
  terrainAcheter: TerrainAcheter;
  flasTerrains: FlashTerrain[];
  edit = false;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  personne: Personne;
  editMode = false;
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private terrainAcheterService: TerrainAcheterService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.terrainAcheterService.getTerrainAcheterByIdPersonne(+params.get('id')))
    ).subscribe(result => {
      if(result){
        this.terrainAcheter = result.body;
        this.terrains = this.terrainAcheter.terrains;
        this.personne = this.terrainAcheter.personne;
        this.editMode = true;
        console.log('Voir les produit ramené', this.terrains);
      }

    });
      this.setCurrentLocation();
  }
  // Get Current Location Coordinates
     private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }


  }
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

}
