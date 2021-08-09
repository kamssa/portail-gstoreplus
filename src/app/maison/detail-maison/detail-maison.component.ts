import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Terrain} from "../../models/Terrain";

import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

import {MediaObserver} from "@angular/flex-layout";
import {switchMap} from "rxjs/operators";
import {Maison} from "../../models/Maison";
import {DetailMaison} from "../../models/DetailMaison";
import {MaisonService} from "../../service/maison.service";
import {DetailMaisonService} from "../../service/detail-maison.service";
import {ImageDetailMaison} from "../../models/ImageDetailMaison";

@Component({
  selector: 'app-detail-maison',
  templateUrl: './detail-maison.component.html',
  styleUrls: ['./detail-maison.component.css']
})
export class DetailMaisonComponent implements OnInit {

  maison: Maison;
  detailMaison: DetailMaison;
  terrainId: number;
  photo: ImageDetailMaison[];
  value = 'Clear me';
  private mediaSub: Subscription;
  terrains: Terrain[];
  edit = false;
  title = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private maisonService: MaisonService,
              private detailMaisonService: DetailMaisonService,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.detailMaisonService.getDetailMaisonByIdMaison(+params.get('id')))
    ).subscribe(result => {
      if (result.status === 0){
        this.detailMaison = result.body;
        console.log('detailTerrain', this.detailMaison);
        this.detailMaisonService.getImageDetailMaisonByIdDetailMaison(this.detailMaison.id)
          .subscribe(data => {
            this.photo = data.body;
            console.log('Photo', this.photo);
          });
      }else {
        console.log('valeur null');
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

  onDemande(id: number) {
    this.router.navigate(['demande', id]);
  }

}
