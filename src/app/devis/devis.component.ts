import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  constructor(private router: Router,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  envoyer() {
    this._snackBar.open('Merci!', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: 'top',

    });
    this.router.navigate(['/accueil']);
  }
}
