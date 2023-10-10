import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CommandesService } from 'src/app/services/commandes.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Commande } from 'src/app/shared/commande';
import { Fournisseur } from 'src/app/shared/fournisseur';

@Component({
  selector: 'app-edit-commande',
  templateUrl: './edit-commande.component.html',
  styleUrls: ['./edit-commande.component.css']
})
export class EditCommandeComponent implements OnInit {
  id : number;
  commande : Commande = {
    id : null,
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
    appUser: null,
    commandeItems : null,
  }
  forns: Fournisseur[] = [];
  fourniss :Fournisseur ={
    id: null,
    compte: null,
    libelle: null,
    commandes: null
  }

  constructor(private commandeService : CommandesService ,
              private flashMessage : FlashMessagesService ,
              private router : Router,
              private fournisseurService : FournisseurService,
              private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.getFournisseur();
    this.getCommandeById();
  }
  getFournisseur(){
    this.fournisseurService.getAllFournisseur().subscribe(frns =>{
      this.forns = frns;
      console.log(this.forns)
    }, error =>{
      console.log(error); 
    })
  }
  changeFournisseur(e){
    //console.log(e.target.value)
    this.fourniss.id = e.target.value;
    this.commande.fournisseur = this.fourniss;
    //console.log(this.fourniss)
    //console.log(this.commande)  
  }
  getCommandeById(){
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.commandeService.getById(this.id).subscribe(cmd =>{
      this.commande = cmd;
      console.log(cmd)
    }, err =>{
      console.log(err)
    }
    )
  }


  onUpdate(){
    this.commandeService.updateCommande(this.commande).subscribe(
      cmd => {
        console.log(cmd),
        this.router.navigate(['/bc/list'])
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la commande:', error);
      }
    ) 
    this.flashMessage.show('Commande Updated successfully', {cssClass: 'alert-success', timeout: 4000});
    
  }

}
