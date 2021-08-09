import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Terrain} from "../models/Terrain";
import {Subscription} from "rxjs";
import {TerrainAcheter} from "../models/TerrainAcheter";
import {Personne} from "../models/Personne";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TerrainAcheterService} from "../service/terrain-acheter.service";
import {switchMap} from "rxjs/operators";
import {DetailTerrain} from "../models/DetailTerrain";

declare var google;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  detailTerrain: DetailTerrain;
  terrainId: number;
  value = 'Clear me';
  private mediaSub: Subscription;
  terrainAcheter: TerrainAcheter;
  edit = false;
  title: string = 'AGM project';
  latitude: any;
  longitude: any;
  zoom: number;
  personne: Personne;
  editMode = false;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  mapTypeId: any;
  googleMapType = 'hybrid';
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

        console.log('terrain acheter ramené', result);
        this.terrainAcheter = result.body;
        this.detailTerrain = this.terrainAcheter.detailTerrain;
        this.personne = this.terrainAcheter.personne;
        this.editMode = true;
        console.log('Voir les produit ramené', this.terrainAcheter);
      }

    });
    this.setCurrentLocation();
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.terrainAcheter.detailTerrain.latitude;
        this.longitude = this.terrainAcheter.detailTerrain.longitude;
        this.zoom = 1000;
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
