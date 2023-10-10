import { Commande } from "./commande";

export  class Fournisseur{
    id: number;
    compte: string;
    libelle: string;
    commandes?: Commande[];
  }