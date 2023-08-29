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
     typeCommande: TypeCommande;
     fournisseur: Fournisseur;
     factures: Facture[];
     utilisateur: Utilisateur;
  }
  class TypeCommande{
    libelle : string
  }
  class Fournisseur{
    id: number;
    compte: string;
    libelle: string;
    commandes: Commande[];
  }
  class Facture{
    id: number;
    numero: string;
    dateFacture: Date;
    montanHT: number;
    montantTva: number;
    dateEcheance: Date;
    dateReglement: Date;
    dateSaisie: Date;
    dateReceptionCompta: Date;
    dateLivraison: Date;
    receptionSaisie: boolean;
    commande: Commande;
  }
  class Utilisateur{
    id: number;
    nom: string;
    prenom: string;
    cni: string;
    e_mail: string;
    userName: string;
    commandes: Commande[];
  }

 