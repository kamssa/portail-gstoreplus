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
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery-9";

@Component({
  selector: 'app-detail-maison',
  templateUrl: './detail-maison.component.html',
  styleUrls: ['./detail-maison.component.css']
})
export class DetailMaisonComponent implements OnInit {

  detailMaison: DetailMaison;
  detailMaisons: DetailMaison[];
  terrainId: number;
  photo: any;
  photos: any[];
  value = 'Clear me';
  private mediaSub: Subscription;

  title = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  public path: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  pathNullImage = './assets/img/maison.jpg';
  liens: string[] = [];
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
        this.detailMaisons = result.body;
        console.log('detailTerrain', this.detailMaisons);
        this.detailMaisons.forEach(value => {
          this.detailMaison = value;
          this.detailMaisonService.getImageDetailMaisonByIdDetailMaison(value.id)
            .subscribe(data => {
              this.photos = data.body;
              this.photos.forEach(value => {
                this.photo = value;
                this.path = value.imageUrl;
                let lien : string = value.imageUrl;
                this.liens.push(lien);
                let rabl: any = [];
                for (let i = 0; i < this.liens.length; ++i){
                  rabl.push(  {
                    small:  this.liens[i],
                    medium: this.liens[i],
                    big: this.liens[i]
                  });
                }
                this.galleryImages = rabl;
                console.log('map', this.detailMaison);
              });
            }, error => {
              console.log('valeur null');
            });
        });

      }
    });
this.galleryOptions = [
  {
    width: '410px',
    height: '400px',
    thumbnailsColumns: 4,
    imageAnimation: NgxGalleryAnimation.Slide
  },
  // max-width 800
  {
    breakpoint: 800,
    width: '100%',
    height: '600px',
    imagePercent: 80,
    thumbnailsPercent: 20,
    thumbnailsMargin: 20,
    thumbnailMargin: 20
  },
  // max-width 400
  {
    breakpoint: 400,
    preview: false
  }
];
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
