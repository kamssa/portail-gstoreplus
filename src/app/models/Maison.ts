import {Ville} from './combo/Ville';
import {Produit} from './Produit';

export class Maison extends Produit{
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public path?: string,
              public numero?: string,
              public ville?: Ville,
              public type?: string,
              public surfaceUtile?: string,
              public surfaceTerrain?: string,
              public situationGeographique?: string,
              public maisonType?: string,
              public prix?: number
  ) {
    super(id, version, libelle, description, path, numero, ville, type);
  }
}
