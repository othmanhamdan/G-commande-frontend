import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CommandesService } from 'src/app/services/commandes.service';
import { ApiResponse } from 'src/app/shared/api-response';
import { Page } from 'src/app/shared/page';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticleComponent } from '../article/article.component';
import { DetailArticleComponent } from '../detail-article/detail-article.component';
import { DetailFactureComponent } from '../detail-facture/detail-facture.component';
import { FacturerComponent } from '../facturer/facturer.component';
import { Router } from '@angular/router';
import { Commande } from 'src/app/shared/commande';
import Swal from 'sweetalert2';
import { AppUserService } from 'src/app/services/app-user.service';
import { AppUser } from 'src/app/shared/appUser';


@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {

  commandeState$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  
 

  

  constructor(private commandeService: CommandesService,
              private matDialog: MatDialog,
              private router : Router,
              private appUserService : AppUserService
              ) { }

  ngOnInit(): void {
    this.getCommandes();
    
    }
    getCommandes(){
      this.commandeState$ = this.commandeService.getAllCommandes$().pipe(
        map((response : ApiResponse<Page>) =>{
          this.responseSubject.next(response)
          //this.currentPageSubject.next(response.content[0]?.id)
          console.log(response)
        
          return ({  appState : 'APP_LOADED' , appData : response });
        }
        ),
        startWith({  appState : 'APP_LOADING'}),
        catchError(( error : HttpErrorResponse) => of({ appState : 'APP_ERROR', error}))
        
      );
    }
    goToPage(unite? : string, numero? : string, libelle? :string, nom? :string, pageNumber? : number){
      this.commandeState$ = this.commandeService.getAllCommandes$(unite,numero,libelle,nom, pageNumber).pipe(
        map((response : ApiResponse<Page>) =>{
          this.responseSubject.next(response)
          this.currentPageSubject.next(pageNumber)
          console.log(response);
          return ({  appState : 'APP_LOADED' , appData : response });
        }
        ),
        startWith({  appState : 'APP_LOADED' , appData : this.responseSubject.value}),
        catchError(( error : HttpErrorResponse) => of({ appState : 'APP_ERROR', error}))
      )
      
    }
    goToNextOrPreviousPage(direction? : string, unite? : string, numero? : string, libelle? :string, nom? :string ) : void {
      this.goToPage(unite, numero,libelle,nom,direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
    }
    openAddArticle(cmd) {
      //let donnees = this.commandeState$;
      this.router.navigate(['/bc/vide'])
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "50%";
      dialogConfig.height= "68%";
      dialogConfig.data = {
        id : cmd.id,
        numero : cmd.numero,
        date: cmd.date,
        valide: cmd.valide,
        unite: cmd.unite,
        observation: cmd.observation,
        delaiLivraison: cmd.delaiLivraison,
        delaiPaiment: cmd.delaiPaiment,
        lieuLivraison: cmd.lieuLivraison,
        supprime: cmd.supprime,
        modePaiment: cmd.modePaiment,
        reliquat: cmd.reliquat,
        referenceDevis: cmd.referenceDevis,
        dateDerniereFacture: cmd.dateDerniereFacture,
        cloture: cmd.cloture,
        remise: cmd.remise,
        countable: cmd.countable,
        dateRelanceFacture: cmd.dateRelanceFacture,
        typeCommande: cmd.typeCommande,
        fournisseur: cmd.fournisseur,
        factures: cmd.factures,
        appUser: cmd.appUser,
      }
      this.matDialog.open(ArticleComponent, dialogConfig);
    }
    openDetails(cmd) {
      //let donnees = this.commandeState$;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "70%";
      dialogConfig.height= "78%";
      dialogConfig.data = {
        id : cmd.id,
        //numero : cmd.numero
      }
      this.matDialog.open(DetailArticleComponent, dialogConfig);
    }
    openDetailFacture(cmd){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "50%";
      dialogConfig.height= "68%";
      dialogConfig.data = {
        id : cmd.id,
        //numero : cmd.numero
      }
      this.matDialog.open(DetailFactureComponent, dialogConfig);
    }
    openFacturer(cmd){
      this.router.navigate(['/bc/vide'])
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "50%";
      dialogConfig.height= "68%";
      dialogConfig.data = {
        id : cmd.id,
        numero : cmd.numero,
        date: cmd.date,
        valide: cmd.valide,
        unite: cmd.unite,
        observation: cmd.observation,
        delaiLivraison: cmd.delaiLivraison,
        delaiPaiment: cmd.delaiPaiment,
        lieuLivraison: cmd.lieuLivraison,
        supprime: cmd.supprime,
        modePaiment: cmd.modePaiment,
        reliquat: cmd.reliquat,
        referenceDevis: cmd.referenceDevis,
        dateDerniereFacture: cmd.dateDerniereFacture,
        cloture: cmd.cloture,
        remise: cmd.remise,
        countable: cmd.countable,
        dateRelanceFacture: cmd.dateRelanceFacture,
        typeCommande: cmd.typeCommande,
        fournisseur: cmd.fournisseur,
        factures: cmd.factures,
        appUser: cmd.appUser,      
      }
      this.matDialog.open(FacturerComponent, dialogConfig);
    }
    calculMontant(cmd : Commande) : number{
      let total = 0;
      for (const cmdItem of cmd.commandeItems) {
        total += cmdItem.montant;
      }
    return total; 
    }
    calculMontantHt(cmd : Commande) : number{
      let totalfac = 0;
      for (const fac of cmd.factures) {
        totalfac += fac.montanHT;
      }
    return totalfac; 
    }
    goToDelete(cmd : Commande){
      this.router.navigate(['/bc/vide'])
      Swal.fire({
        title: 'Êtes-vous sûre?',
        text: "Vous ne pourrez pas inverser cela!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.commandeService.delete(cmd.id).subscribe(cmd =>{
            console.log(cmd),
            this.router.navigate(['/bc/list'])               
          })
          
          Swal.fire(
            'Supprimé!',
            'Votre fichier a été supprimé.',
            'success',
          )
        }
        
      })  
       
    }
    cloturer(cmd : Commande){
      this.router.navigate(['/bc/vide'])
      Swal.fire({
        title: 'Êtes-vous sûre?',
        text: "Vous ne pourrez pas inverser cela!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, cloturez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.commandeService.cloture(cmd).subscribe( 
          cmd =>{
             console.log(cmd),
             this.router.navigate(['/bc/list'])
          },
      error => {
        console.error('Erreur lors de l\'enregistrement de la cloture:', error);
      })
      
          Swal.fire(
            'cloturé!',
            'Votre fichier a été cloturé.',
            'success',
          )
        }
        
      })  
      
    }
    valider(cmd : Commande){
      this.router.navigate(['/bc/vide'])
      Swal.fire({
        title: 'Êtes-vous sûre?',
        text: "Vous ne pourrez pas inverser cela!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, validez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.commandeService.valide(cmd).subscribe( cmd =>{
          console.log(cmd),
          this.router.navigate(['/bc/list'])
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la validation:', error);
      })
          Swal.fire(
            'validé!',
            'Votre fichier a été validé.',
            'success',
          )
        }
        
      })  
    }
}
