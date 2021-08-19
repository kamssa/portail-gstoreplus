import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Terrain} from "../models/Terrain";
import {Subscription} from "rxjs";
import {TerrainAcheter} from "../models/TerrainAcheter";
import {Personne} from "../models/Personne";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TerrainAcheterService} from "../service/terrain-acheter.service";
import {switchMap} from "rxjs/operators";
import {DetailTerrain} from "../models/DetailTerrain";
import {TerrainVenduService} from "../service/terrain-vendu.service";
import {TerrainVendu} from "../models/TerrainVendu";

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
  terrainVendu: TerrainVendu;
  terrainVendus: TerrainVendu[];
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
              private terrainVenduService: TerrainVenduService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.terrainVenduService.getTerrainVenduByIdPersonne(+params.get('id')))
    ).subscribe(result => {
      if(result){
        console.log('terrain acheter ramené', result);
        this.terrainVendus = result.body;
        this.editMode = true;
        this.zoom = 1000;
        console.log('Voir les produit ramené', this.terrainVendus);
        /*this.terrainVendus.forEach(v =>{
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.latitude = v.latitude;
              this.longitude = v.longitude;

            });

          }
          }
        );*/

      }

    });
   // this.setCurrentLocation();
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.terrainVendu.latitude;
        this.longitude = this.terrainVendu.longitude;
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
