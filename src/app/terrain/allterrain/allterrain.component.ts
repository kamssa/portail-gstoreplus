import { Component, OnInit } from '@angular/core';
import {Terrain} from "../../models/Terrain";
import {TerrainService} from "../../service/terrain.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-allterrain',
  templateUrl: './allterrain.component.html',
  styleUrls: ['./allterrain.component.scss']
})
export class AllterrainComponent implements OnInit {
terrains: Terrain[];
  constructor(private terrainService: TerrainService, private router: Router) { }

  ngOnInit(): void {
    this.terrainService.getAllTerrain().subscribe(data => {
      this.terrains = data.body;
      console.log(this.terrains);
    });
  }

  onDetail(id: number) {
    console.log('Voir id', id);
    this.router.navigate(['detail', id]);
  }
}
