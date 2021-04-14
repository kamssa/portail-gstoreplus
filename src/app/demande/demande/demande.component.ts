import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Terrain} from "../../models/Terrain";
import {Subscription} from "rxjs";
import {FlashTerrain} from "../../models/FlashTerrain";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TerrainService} from "../../service/terrain.service";
import {MediaObserver} from "@angular/flex-layout";
import {FlashService} from "../../service/flash.service";
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Client} from "../../models/Client";
import {ClientService} from "../../service/client.service";
import {Prospect} from "../../models/Prospect";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ProspectService} from "../../service/prospect.service";
import {Categorie} from "../../models/Categorie";
import {Ville} from "../../models/Ville";
import {Demande} from "../../models/Demande";
import {DemandeService} from "../../service/demande.service";


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {
  libelles: any[] = ['Mr', 'Madame', 'Mademoiselle'];
  terrain: Terrain;
  terrainId: number;
  value = 'Clear me';
  private mediaSub: Subscription;
  terrains: Terrain[];
  flasTerrains: FlashTerrain[];
  edit = false;
  demandeForm: FormGroup;
  private dialogConfig;
  prospect: Prospect;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  titre: string;
  titres = [
    {libelle: 'Mlle', name: 'Mlle'},
    {libelle: 'Mme', name: 'Mme'},
    {libelle: 'Mr', name: 'Mr'}
  ];
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private terrainService: TerrainService,
              private  demandeService: DemandeService,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver,
              private flashService: FlashService,
              private fb: FormBuilder,
              private prospectService: ProspectService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.terrainService.getTerrainById(+params.get('id')))
    ).subscribe(result => {
      this.terrain = result.body;
      console.log('Voir le terrain ramené', this.terrain);
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.demandeForm = this.fb.group({
      titre: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      fonction: '',
      adresse: this.fb.group({
        telephone: ''
      })
    });

  }

  onSubmit(demandeFormValue) {

    console.log(this.demandeForm.value);
    let  prospect: Prospect = {
      titre: this.titre,
      nom: demandeFormValue.nom,
      prenom: demandeFormValue.prenom,
      email: demandeFormValue.email,
      password: demandeFormValue.password,
      fonction: demandeFormValue.fonction,
      adresse: demandeFormValue.adresse,
      type:'PR'
    };

    this.prospectService.registraction(prospect, 'demande').subscribe(resultat => {
      console.log(' voir le prospect retourne', resultat.body1.id);
      if (resultat){
        this.prospect = resultat.body1;
        let demande : Demande = {
          id: null,
          version: null,
          produit: this.terrain,
          personne: {
          id: this.prospect.id,
            version: this.prospect.version,
            type: 'PR'
          }
        };
        this.demandeService.ajoutDemande(demande).subscribe(data => {
          if (data){
            console.log('Voir le terrain modifie', data);
            this.snackBar.open(' Merci de verifier votre mail!', '', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,

            });
            this.router.navigate(['accueil']);
          }

        });
      }
    });

  }
  greetTitre(event) {
    console.log(event.value);
    this.titre = event.value;
  }
}
