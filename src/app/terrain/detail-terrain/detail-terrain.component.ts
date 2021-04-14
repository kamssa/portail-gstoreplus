import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TerrainService} from "../../service/terrain.service";
import {switchMap} from "rxjs/operators";
import {Terrain} from "../../models/Terrain";
import {MediaObserver} from "@angular/flex-layout";
import {FlashService} from "../../service/flash.service";
import {Subscription} from "rxjs";
import {FlashTerrain} from "../../models/FlashTerrain";

@Component({
  selector: 'app-detail-terrain',
  templateUrl: './detail-terrain.component.html',
  styleUrls: ['./detail-terrain.component.scss']
})
export class DetailTerrainComponent implements  OnInit, AfterViewInit, OnDestroy{
  terrain: Terrain;
  terrainId: number;
  value = 'Clear me';
  private mediaSub: Subscription;
  terrains: Terrain[];
  flasTerrains: FlashTerrain[];
  edit = false;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private terrainService: TerrainService,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver,
              private flashService: FlashService, ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.terrainService.getTerrainById(+params.get('id')))
    ).subscribe(result => {
      this.terrain = result.body;
      this.terrainId = result.body.id;
      console.log('Voir le terrain ramené', this.terrain);
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

  onDemande(id: number) {
    this.router.navigate(['demande', id]);
  }
}
