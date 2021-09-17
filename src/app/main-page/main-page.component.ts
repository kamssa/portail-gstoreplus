import { Component, OnInit } from '@angular/core';
import {Personne} from "../models/Personne";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientService} from "../service/client.service";
import {AuthService} from "../service/auth.service";
import {ImageAccueil} from "../models/ImageAccueil";
import {ImageAccueilService} from "../service/imageAccueil.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
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
