
import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ArticleService } from 'src/app/services/article.service';
import { Articles } from 'src/app/shared/articles';
import { Commande } from 'src/app/shared/commande';
import { ListCommandeComponent } from '../list-commande/list-commande.component';
import { CommandesService } from 'src/app/services/commandes.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  commande : Commande= {
    id: null,
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
  };
  articles : Articles = {
    id : null,
    referenceArticle: null,
    article: null,
    uniteMesure :null,
    quantite : 0,
    prixUnitaire : 0.0,
    montant : 0,
    commande : null,
  }
  drReliquat: number;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private articleService : ArticleService,
              private router : Router,
              private dialogRef: MatDialogRef<ArticleComponent>) { }

  ngOnInit(): void {
    this.commande = this.data;

    //console.log(this.commande)
    this.articles.commande = this.data;
    this.drReliquat = this.data.reliquat
    console.log(this.drReliquat)
  }
  onSubmit(){
    const nvreliquat = (this.articles.prixUnitaire * this.articles.quantite)
    console.log(nvreliquat)
    this.articles.commande.reliquat = this.drReliquat + nvreliquat;
    console.log(this.articles)
    this.articleService.saveArticle(this.articles).subscribe(
      article => {
        console.log(article);
        this.router.navigate(['/bc/list'])
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la Article:', error);
      }
    ) 
    
    this.dialogRef.close(); 
  }
  closed(){
    this.router.navigate(['/bc/list'])
    this.dialogRef.close();
    
  }
 
}
