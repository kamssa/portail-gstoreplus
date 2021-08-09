import { Component, OnInit } from '@angular/core';
import {ImageAccueilService} from "../../service/imageAccueil.service";
import {ImageAccueil} from "../../models/ImageAccueil";

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  test : Date = new Date();
  imageAccueil: ImageAccueil[];
  constructor(private  imageAccueilService: ImageAccueilService) { }

  ngOnInit(): void {
    this.imageAccueilService.getAllImageAccueil()
      .subscribe(data => {
       this.imageAccueil = data.body;
       console.log(this.imageAccueil);
      });
  }

}
