import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-immobilier',
  templateUrl: './all-immobilier.component.html',
  styleUrls: ['./all-immobilier.component.css']
})
export class AllImmobilierComponent implements OnInit {
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
