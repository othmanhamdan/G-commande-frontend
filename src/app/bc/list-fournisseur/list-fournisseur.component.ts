import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response';
import { Page } from 'src/app/shared/page';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppUser } from 'src/app/shared/appUser';
import { TokenService } from 'src/app/services/token.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { ArticleService } from 'src/app/services/article.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';


@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {
  supplierState$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  searshCommande$: Observable<{ appState: string; appData?: ApiResponse<Page>; error?: HttpErrorResponse; }>;
  token: string;
  appUser: AppUser;
 

  

  constructor(private supplierService : FournisseurService,
              private tokenService :TokenService,
              private appUserService : AppUserService
              ) { }

  ngOnInit(): void {
    
    
    this.getCommandes(); 
  
    
    }
    getCommandes(){
    //this.getTokenByUserPrincipal()
    //const appUser = this.getUserByToken(this.token)
    //const username = appUser.sub.toString();
    //this.getUserByUserName(username)
    

    this.supplierState$ = this.supplierService.getAll().pipe(
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
    goToPage(libelle? : string, pageNumber? : number){
      this.supplierState$ = this.supplierService.getAll(libelle,pageNumber).pipe(
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
    goToNextOrPreviousPage(direction? : string, libelle? : string) : void {
      this.goToPage(libelle,direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
    }

  




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
    

}
