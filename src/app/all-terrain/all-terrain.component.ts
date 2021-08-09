import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-terrain',
  templateUrl: './all-terrain.component.html',
  styleUrls: ['./all-terrain.component.css']
})
export class AllTerrainComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  constructor( private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onDetailMaison(): void {
    this._snackBar.open('Bientôt disponible!', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: 'top',

    });

  }
}
