import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
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
