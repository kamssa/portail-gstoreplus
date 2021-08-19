import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {TerrainService} from "../service/terrain.service";
import {Router} from "@angular/router";
import {Produit} from "../models/Produit";

@Component({
  selector: 'app-all-terrain',
  templateUrl: './all-terrain.component.html',
  styleUrls: ['./all-terrain.component.css']
})
export class AllTerrainComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  terrains: Produit[];
  constructor( private _snackBar: MatSnackBar,
               private terrainService: TerrainService,
               private  router: Router) { }

  ngOnInit(): void {
    this.terrainService.getAllTerrainAbidjan()
      .subscribe(res => {
        console.log(res.body);
        this.terrains = res.body;
      });
  }

  onDetailMaison(): void {
    this._snackBar.open('Bientôt disponible!', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: 'top',

    });

  }

  onDetailTerrain(id: number) {
    console.log('Voir id', id);
    this.router.navigate(['detailTerrain', id]);
  }
}
