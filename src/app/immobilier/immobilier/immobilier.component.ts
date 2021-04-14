import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilier.component.html',
  styleUrls: ['./immobilier.component.scss']
})
export class ImmobilierComponent implements OnInit {
  terrains: any;
  villes: any;
  flasTerrains: any[];

  constructor() { }

  ngOnInit(): void {
  }

  onDetail(id: any) {

  }

  openTerrainVille() {

  }

  changeVille(value: any) {
    
  }
}
