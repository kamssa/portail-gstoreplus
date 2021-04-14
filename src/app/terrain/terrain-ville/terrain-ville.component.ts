import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TerrainService} from "../../service/terrain.service";
import {Terrain} from "../../models/Terrain";

@Component({
  selector: 'app-terrain-ville',
  templateUrl: './terrain-ville.component.html',
  styleUrls: ['./terrain-ville.component.scss']
})
export class TerrainVilleComponent implements OnInit {
  terrains: Terrain[];
  constructor(private route: ActivatedRoute, private terrainService: TerrainService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.terrainService.getTerrainByIdVille(+params.get('id')))
    ).subscribe(result => {
      this.terrains = result.body;
      console.log('Voir le terrain ramené', this.terrains);
    });
  }

  onDetail(id: number) {
    console.log('Voir id', id);
    this.router.navigate(['detail', id]);
  }
}
