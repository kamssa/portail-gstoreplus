import {Document} from './Document';
import {Produit} from './Produit';
import {Ville} from './combo/Ville';


export class FlashTerrain extends Produit{
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public prix?: number,
              public path?: string,
              public latitude?: number,
              public longitude?: number,
              public numero?: string,
              public categorie?: Document,
              public ville?: Ville,
              public paye?: boolean,
              public abonneGeo?: boolean,
              public unite?: string,
              public note?: string,
              public prixParMettreCarre?: string,
              public superficie?: string,
              public type?: string
  ) {
    super(id, version, libelle, description, prix, path, latitude, longitude, numero, categorie, ville, paye, abonneGeo, unite, note, prixParMettreCarre, superficie,  type );
  }

}
