import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/shared/api-response';
import { Page } from 'src/app/shared/page';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommandesService } from 'src/app/services/commandes.service';
import { Router } from '@angular/router';
import { catchError, map, startWith } from 'rxjs/operators';
import { Commande } from 'src/app/shared/commande';
import { DetailArticleComponent } from '../detail-article/detail-article.component';

@Component({
  selector: 'app-bc-non-cloturer',
  templateUrl: './bc-non-cloturer.component.html',
  styleUrls: ['./bc-non-cloturer.component.css']
})
export class BcNonCloturerComponent implements OnInit {

  commandeState$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  searshCommande$: Observable<{ appState: string; appData?: ApiResponse<Page>; error?: HttpErrorResponse; }>;

  constructor(private commandeService: CommandesService,
    private matDialog: MatDialog,
    private router : Router) { }

  ngOnInit(): void {
    this.getCommandesNonCloturer();
  }
  getCommandesNonCloturer(){
    this.commandeState$ = this.commandeService.getAllCommandeNonCloturer$().pipe(
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
  goToPage(unite? : string, nom? :string, pageNumber? : number){
    this.commandeState$ = this.commandeService.getAllCommandeNonCloturer$(unite,nom, pageNumber).pipe(
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
  goToNextOrPreviousPage(direction? : string, unite? : string, nom? :string ) : void {
    this.goToPage(unite,nom,direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  }
  calculMontant(cmd : Commande) : number{
    //console.log(cmd.commandeItems)
    let total = 0;
    for (const cmdItem of cmd.commandeItems) {
      total += cmdItem.montant;
    }
  return total; 
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

}
