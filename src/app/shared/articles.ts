import { Commande } from "./commande";

export  class Articles{
    id: number;
    referenceArticle: string;
    article: string;
    uniteMesure :string;
    quantite : number;
    prixUnitaire : number;
    montant : number;
    commande : Commande;
   
  }