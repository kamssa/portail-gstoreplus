import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Maison} from "../../models/Maison";
import {DetailMaison} from "../../models/DetailMaison";
import {ImageDetailMaison} from "../../models/ImageDetailMaison";
import {Subscription} from "rxjs";
import {Terrain} from "../../models/Terrain";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MaisonService} from "../../service/maison.service";
import {DetailMaisonService} from "../../service/detail-maison.service";
import {MediaObserver} from "@angular/flex-layout";
import {switchMap} from "rxjs/operators";
import {FlashMaison} from "../../models/FlashMaison";
import {DetailFlashMaison} from "../../models/DetailFlashMaison";
import {FlashMaisonService} from "../../service/flash-maison.service";
import {DetailFlashMaisonService} from "../../service/detail-flash-maison.service";

@Component({
  selector: 'app-detail-flash-maison',
  templateUrl: './detail-flash-maison.component.html',
  styleUrls: ['./detail-flash-maison.component.scss']
})
export class DetailFlashMaisonComponent implements OnInit {
  flashMaison: FlashMaison;
  detailFlashMaison: DetailFlashMaison;
  terrainId: number;
  photo: any[];
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
              private flashMaisonService: FlashMaisonService,
              private detailFlashMaisonService: DetailFlashMaisonService,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.detailFlashMaisonService.getDetailMaisonByIdFlash(+params.get('id')))
    ).subscribe(result => {
      if (result.status === 0){
        this.detailFlashMaison = result.body;
        console.log('detailTerrain', this.detailFlashMaison);
        this.detailFlashMaisonService.getImageDetailByIdDetail(this.detailFlashMaison.id)
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
