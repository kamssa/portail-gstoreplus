import {Produit} from './Produit';
import {Personne} from './Personne';
import {Terrains} from "./Terrains";

export class TerrainAcheter {
  constructor(public id?: number,
              public version?: number,
              public terrains?: Terrains,
              public personne?: Personne) {
  }
}
