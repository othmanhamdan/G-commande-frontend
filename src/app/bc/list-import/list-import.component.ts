import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CommandesService } from 'src/app/services/commandes.service';
import { ApiResponse } from 'src/app/shared/api-response';
import { Page } from 'src/app/shared/page';
import { Router } from '@angular/router';
import { Commande } from 'src/app/shared/commande';
import Swal from 'sweetalert2';
import { FactureService } from 'src/app/services/facture.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegleeComponent } from '../reglee/reglee.component';
import { AppUser } from 'src/app/shared/appUser';
import { TokenService } from 'src/app/services/token.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-import',
  templateUrl: './list-import.component.html',
  styleUrls: ['./list-import.component.css']
})
export class ListImportComponent implements OnInit {


  factureImport$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  searshCommande$: Observable<{ appState: string; appData?: ApiResponse<Page>; error?: HttpErrorResponse; }>;
  //token: string;
  //appUser: AppUser;
  confirmer : boolean;
 

  

  constructor(private factureService: FactureService,
              private router : Router,
              private matDialog: MatDialog,
              private tokenService :TokenService,
              private appUserService : AppUserService,
              private datePipe: DatePipe
              ) { }

  ngOnInit(): void {
    
    
    this.getCommandes(); 
  
    
    }
    formaterDate(date : Date): any{
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    getCommandes(){
   /* this.getTokenByUserPrincipal()
    const appUser = this.getUserByToken(this.token)
    const username = appUser.sub.toString();
    this.getUserByUserName(username)*/
    const date_debut = new Date('1962-01-01');
    const dateDebut = this.formaterDate(date_debut);
    
    const date_fin = new Date();
    const datefin = this.formaterDate(date_fin);
    const recupEnStock = true;
    const recupEncpt = true;

    this.factureImport$ = this.factureService.getAllFactureImport$(dateDebut,datefin,recupEnStock,recupEncpt).pipe(
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
    goToPage(dateDebut : Date,datefin: Date,recupEnStock : boolean, recupEncpt:boolean, libelle? :string,numero? : string, pageNumber? : number){
      const date_debut = this.formaterDate(dateDebut);
      const date_fin = this.formaterDate(datefin);
      this.factureImport$ = this.factureService.getAllFactureImport$(date_debut,date_fin,recupEnStock,recupEncpt,libelle,numero,pageNumber).pipe(
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
    goToNextOrPreviousPage(direction? : string, dateDebut? : Date,datefin?: Date,recupEnStock? : boolean, recupEncpt?:boolean, libelle? :string,numero? : string ) : void {
      this.goToPage(dateDebut,datefin,recupEnStock,recupEncpt,libelle,numero,direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
    }
    confirme(fac){
      this.router.navigate(['/bc/vide'])
      Swal.fire({
        title: 'Êtes-vous sûre?',
        text: "Vous ne pourrez pas inverser cela!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, confirmez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.factureService.confirmeReception(fac).subscribe(facture =>{
            console.log(facture),
            this.router.navigate(['/bc/listImport'])
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la validation:', error);
      })
          Swal.fire(
            'validé!',
            'Votre fichier a été confirmé.',
            'success',
          )
        }
        
      })
    }



/*
    getTokenByUserPrincipal(){
      this.token= this.tokenService.getToken();
    }
    getUserByToken(token : string) : string{
      return JSON.parse(atob(token.split('.')[1]));
    }
    getUserByUserName(userName : string){
      this.appUserService.getUserByName(userName).subscribe(
        user => {
          this.appUser = user
          console.log(this.appUser);
        }
      )
    }
    
*/

}
