import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Produit} from "../../models/Produit";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Personne} from "../../models/Personne";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProduitService} from "../../service/produit.service";
import {DemandeService} from "../../service/demande.service";
import {MediaObserver} from "@angular/flex-layout";
import {AuthService} from "../../service/auth.service";
import {switchMap} from "rxjs/operators";
import {ClientService} from "../../service/client.service";
import {Demande} from "../../models/Demande";
import {TerrainService} from "../../service/terrain.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Terrain} from "../../models/Terrain";
import {DetailTerrain} from "../../models/DetailTerrain";
import {DetailTerrainService} from "../../service/detail-terrain.service";

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
    produit: Produit;
  terrainId: number;
  txt: string;
  value = 'Clear me';
  private mediaSub: Subscription;
  produits: Produit[];
  client: Personne;
  edit = false;
  demandeForm: FormGroup;
  private dialogConfig;
   terrain: Terrain;
   detailTerrain: DetailTerrain;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  personne: Personne;
  selectedValue: string;
  code: any;
  titre: string;
  error = '';
  loading = false;
  toppings = new FormControl();
  toppingList: string[] = ['Demande de prix ?', 'Demande de superficie ?', 'Demande de localisation ?', 'Type de programme ?'];
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private helper: JwtHelperService,
              private produitService: ProduitService,
              private clientService: ClientService,
              private detailTerrainService: DetailTerrainService,
              private  demandeService: DemandeService,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DetailTerrain,
              private  terrainService: TerrainService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              public dialogRef: MatDialogRef<DemandeComponent>) { }

  ngOnInit(): void {
    this.detailTerrainService.getDetailTerrainById(this.data['detailTerrain']).subscribe(data => {
      this.detailTerrain = data.body;
    });
    console.log('voir le produit', this.produit);
    this.demandeForm = this.fb.group({
      nomComplet:  new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      selectionner: new FormControl('' ),

      lu: new FormControl('' ),
      message: new FormControl('' ),
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.demandeForm.controls[controlName].hasError(errorName);
  }
  onSubmit() {

    if (this.code === null|| this.code=== undefined){
      this.loading = true;
      let demande: Demande = {
        nomComplet : this.demandeForm.value.nomComplet,
        email: this.demandeForm.value.email,
        code: '225',
        telephone: this.demandeForm.value.telephone,
        selectionner: this.selectedValue,
        message: this.demandeForm.value.message,
        lu: "nonLu",
        produitId: this.detailTerrain.id

      };
      console.log('Voir demande', demande);
       this.demandeService.ajoutDemande(demande).subscribe(res => {
                 if (res){
                   console.log('Voir le terrain modifie', res);
                   this.dialogRef.close(this.produit);
                   this.snackBar.open(' Votre demande a été prise en compte !', '', {
                     duration: 5000,
                     horizontalPosition: this.horizontalPosition,
                     verticalPosition: this.verticalPosition,

                   });
                   this.router.navigate(['accueil']);
                 }

               });
    }else {
      this.loading = true;
      let demande: Demande = {
        nomComplet: this.demandeForm.value.nomComplet,
        email: this.demandeForm.value.email,
        code: this.code,
        telephone: this.demandeForm.value.telephone,
        selectionner: this.selectedValue,
        message: this.demandeForm.value.message,
        lu: "nonLu",
        produitId: this.detailTerrain.id
      };
      console.log('Voir demande', demande);
       this.demandeService.ajoutDemande(demande).subscribe(res => {
                 if (res){
                   console.log('Voir le terrain modifie', res);
                   this.dialogRef.close(this.produit);
                   this.snackBar.open(' Votre demande a été prise en compte !', '', {
                     duration: 5000,
                     horizontalPosition: this.horizontalPosition,
                     verticalPosition: this.verticalPosition,

                   });
                   this.router.navigate(['accueil']);
                 }

               });
    }


  }


  changeValue(value: any) {

  }
  clickIt(){
    this.txt = this.toppings.value;
    console.log('Voir le text recuprer', this.txt);

  }

  filter(data) {
    console.log(data.value);
  }

  getNumber(event) {
 console.log('getNumber', event);
  }

  telInputObject(event) {
   console.log('intelinputObject', event)
  }

  onCountryChange(event: any) {
    console.log(event);
    this.code = event.dialCode;
    console.log(this.code);
  }
}
