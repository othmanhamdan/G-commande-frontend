import { AppUser } from "./appUser";
import { Articles } from "./articles";
import { Facture } from "./facture";
import { Fournisseur } from "./fournisseur";
import { TypeCommande } from "./typeCommande";

export class Commande {
     id: number;
     numero: string;
     date: Date;
     valide: boolean;
     unite: string;
     observation: string;
     delaiLivraison: number;
     delaiPaiment: number;
     lieuLivraison: string;
     supprime: boolean;
     modePaiment: string;
     reliquat: number;
     referenceDevis: string;
     dateDerniereFacture: Date;
     cloture: boolean;
     remise: number;
     countable: boolean;
     dateRelanceFacture: Date;
     typeCommande:any = TypeCommande;
     fournisseur?: Fournisseur;
     factures?: Facture[];
     appUser?: AppUser;
     commandeItems? : Articles[];
  }


 