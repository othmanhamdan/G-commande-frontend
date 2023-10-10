import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response';
import { Page } from 'src/app/shared/page';
import { Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppUser } from 'src/app/shared/appUser';
import { TokenService } from 'src/app/services/token.service';
import { AppUserService } from 'src/app/services/app-user.service';

@Component({
  selector: 'app-facture-reglee',
  templateUrl: './facture-reglee.component.html',
  styleUrls: ['./facture-reglee.component.css']
})
export class FactureRegleeComponent implements OnInit {

  factureStateReglee$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  searshCommande$: Observable<{ appState: string; appData?: ApiResponse<Page>; error?: HttpErrorResponse; }>;
  
  token: string;
  appUser: AppUser;

  

  constructor(private factureService: FactureService,
              private tokenService :TokenService,
              private appUserService : AppUserService
              ) { }

  ngOnInit(): void {
    this.getCommandes();
    
    }
    getCommandes(){
    this.getTokenByUserPrincipal()
    const appUser = this.getUserByToken(this.token)
    const username = appUser.sub.toString();
    this.getUserByUserName(username)
    const libelle = '';
      this.factureStateReglee$ = this.factureService.getAllFactureReglee$(libelle,username).pipe(
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
    goToPage(libelle? :string, userName : string =this.appUser.userName, pageNumber? : number){
      this.factureStateReglee$ = this.factureService.getAllFactureReglee$(libelle,userName, pageNumber).pipe(
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
    goToNextOrPreviousPage(direction? : string, libelle? :string , userName : string =this.appUser.userName) : void {
      this.goToPage(libelle,userName, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
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
