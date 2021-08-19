import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {MaisonService} from "../service/maison.service";
import {Maison} from "../models/Maison";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-immobilier',
  templateUrl: './all-immobilier.component.html',
  styleUrls: ['./all-immobilier.component.css']
})
export class AllImmobilierComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  maisons: Maison[];
  constructor( private _snackBar: MatSnackBar,
               private maisonService: MaisonService, private  router: Router) { }

  ngOnInit(): void {
    this.maisonService.getAllMaison()
      .subscribe(data => {
      this.maisons = data.body;
      });
  }

  onDetailMaison(id: number): void {
    console.log('Voir flash id', id);
    this.router.navigate(['detailMaison', id]);

  }
}
