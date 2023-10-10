import { Commande } from "./commande";

export class AppUser{
    id: number;
    nom: string;
    prenom: string;
    password : string;
    cni: string;
    e_mail: string;
    userName: string;
    commandes?: Commande[];
  }