import {Maison} from "./Maison";

export class DetailMaison {
  constructor( public id ?: number,
               public version?: number,
               public description ?: string,
               public nbreChambre?: number,
               public nbreSalleEau?: number,
               public nbreCuisine?: number,
               public nbreSaleMange?: number,
               public nbreBuanderie?: number,
               public nbreTerrasse?: number,
               public maison?: Maison
  ) {
  }
}
