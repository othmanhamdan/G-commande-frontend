import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, filter, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CommandesService } from 'src/app/services/commandes.service';
import { ApiResponse } from 'src/app/shared/api-response';
import { Commande } from 'src/app/shared/commande';
import { Page } from 'src/app/shared/page';

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
  searshCommande$: Observable<{ appState: string; appData?: ApiResponse<Page>; error?: HttpErrorResponse; }>;

  

  constructor(private commandeService: CommandesService) { }

  ngOnInit(): void {
    this.commandeState$ = this.commandeService.getAllCommandes$().pipe(
      map((response : ApiResponse<Page>) =>{
        this.responseSubject.next(response)
        //this.currentPageSubject.next(response.data.page.number)
        console.log(response);
        return ({  appState : 'APP_LOADED' , appData : response });
      }
      ),
      startWith({  appState : 'APP_LOADING'}),
      catchError(( error : HttpErrorResponse) => of({ appState : 'APP_ERROR', error}))
    )
    
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

}
