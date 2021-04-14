import {Categorie} from './Categorie';
import {Ville} from './Ville';

export class Produit {
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public prix?: number,
              public path?: string,
              public latitude?: number,
              public longitude?: number,
              public numero?: string,
              public categorie?: Categorie,
              public ville?: Ville,
              public paye?: boolean,
              public abonneGeo?: boolean,
              public unite?: string,
              public note?: string,
              public prixParMettreCarre?: string,
              public superficie?: string,
              public type?: string
  ) {
  }
}
