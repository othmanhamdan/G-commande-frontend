import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { FactureService } from 'src/app/services/facture.service';
import { Articles } from 'src/app/shared/articles';
import { Commande } from 'src/app/shared/commande';
import { Facture } from 'src/app/shared/facture';

@Component({
  selector: 'app-facturer',
  templateUrl: './facturer.component.html',
  styleUrls: ['./facturer.component.css']
})
export class FacturerComponent implements OnInit {

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
  article : Articles[] = [];
  facture : Facture ={
    id: null,
    numero: null,
    dateFacture: null,
    montanHT: null,
    montantTva: null,
    montantTTC: null,
    dateEcheance: null,
    dateReglement: null,
    dateSaisie : null,
    dateReceptionCompta: null,
    dateLivraison: null,
    receptionSaisie: false,
    commande: null,
  }
  drReliquat : number;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private articleService : ArticleService,
              private factureService : FactureService,
              private router : Router,
              private dialogRef: MatDialogRef<FacturerComponent>) { }

  ngOnInit(): void {
    this.drReliquat = this.data.reliquat;
    console.log(this.drReliquat);
    this.commande = this.data;
    this.facture.commande = this.commande;
    console.log(this.facture)
    this.getArticleByCommande()
  }
  
    //console.log(this.data.id);
  getArticleByCommande(){
    this.articleService.getAllArticle(this.data.id).subscribe(art =>{
      this.article = art;
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la commande:', error);
    })
  }
  calculateTotal(): number {
    let total = 0;
    for (const article of this.article) {
      total += article.montant;
    }
    return total;    
  }
  save(){
    console.log(this.facture)
    const nvreliquat = (this.facture.montanHT )//* this.facture.montantTva)
    this.facture.commande.reliquat = (this.drReliquat - nvreliquat );
    this.factureService.saveFacture(this.facture).subscribe(
      facture => {
        console.log(facture);
        this.router.navigate(['/bc/list'])
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la facture:', error);
      }
    )
    
    this.dialogRef.close(); 

  }
  closed(){
    this.router.navigate(['/bc/list'])
    this.dialogRef.close();
    
  }

}
