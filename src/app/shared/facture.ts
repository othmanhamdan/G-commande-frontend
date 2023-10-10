import { Commande } from "./commande";

export  class Facture{
    id: number;
    numero: string;
    dateFacture: Date;
    montanHT: number;
    montantTva: number;
    montantTTC: number;
    dateEcheance: Date;
    dateReglement: Date;
    dateSaisie : Date;
    dateReceptionCompta: Date;
    dateLivraison: Date;
    receptionSaisie: boolean;
    commande: Commande;
  }