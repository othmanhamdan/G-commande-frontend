import { Component, OnInit } from '@angular/core';
import { CommandesService } from 'src/app/services/commandes.service';
import { Commande } from 'src/app/shared/commande';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  commande : Commande = {
    id : 0,
    numero: "",
    date: null,
    valide: false,
    unite: "",
    observation: "",
    delaiLivraison: null,
    delaiPaiment: 90,
    lieuLivraison: "",
    supprime: false,
    modePaiment: "",
    reliquat: 0.0,
    referenceDevis: "",
    dateDerniereFacture: null,
    cloture: false,
    remise: null,
    countable: false,
    dateRelanceFacture: null,
    typeCommande: null,
    fournisseur: null,
    factures: null,
    utilisateur: null,
  }

  constructor(private commandeService : CommandesService ) { }

  ngOnInit(): void {
  }

  ngSubmit(){
    this.commandeService.saveCommande(this.commande);
    console.log(this.commande)
  }

}
