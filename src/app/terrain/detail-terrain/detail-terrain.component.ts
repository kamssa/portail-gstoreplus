import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TerrainService} from "../../service/terrain.service";
import {MediaObserver} from "@angular/flex-layout";
import {switchMap} from "rxjs/operators";
import {Terrain} from "../../models/Terrain";
import {Subscription} from "rxjs";
import {DetailTerrainService} from "../../service/detail-terrain.service";
import {DetailTerrain} from "../../models/DetailTerrain";
import {ImageDetail} from "../../models/ImageDetail";
import {DemandeComponent} from "../../demande/demande/demande.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery-9";
import {Image} from "../../models/Image";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail-terrain',
  templateUrl: './detail-terrain.component.html',
  styleUrls: ['./detail-terrain.component.css']
})
export class DetailTerrainComponent implements OnInit {
  terrain: Terrain;
  public detailTerrain: DetailTerrain;
  detailTerrains: DetailTerrain[];
  terrainId: number;
  photos: ImageDetail[];
  photo: ImageDetail;
  value = 'Clear me';
  private mediaSub: Subscription;
  terrains: Terrain[];
  public path: string;
  edit = false;
  title = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  pathNullImage = './assets/img/maison.jpg';
  liens: string[] = [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  isEdit = false;
  public mapphoto: Map<DetailTerrain, ImageDetail[]> = new Map();
  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private  router: Router,
              private terrainService: TerrainService,
              private detailTerrainService: DetailTerrainService,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.detailTerrainService.getDetailTerrainByIdTerrain(+params.get('id')))
    ).subscribe(result => {
      if (result.status === 0){
       this.detailTerrains = result.body;
        console.log('detailTerrain', this.detailTerrains);
        this.detailTerrains.forEach(value => {
          this.detailTerrain = value;
            this.detailTerrainService.getImageDetaiTerrain(value.id)
              .subscribe(data => {
                this.photos = data.body;
                console.log('voir les images', this.photos);
                this.photos.forEach(value => {
                  this.photo = value;
                  console.log('voir les image', this.photo);
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
                  console.log('map', this.detailTerrain);
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
  stepper: any;
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
    console.log('Voir id', id);
    this.dialog.open(DemandeComponent,{
      data: {
        detailTerrain: this.photo.detailTerrain.id
      }
    });
  }
}
