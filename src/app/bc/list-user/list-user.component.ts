import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response';
import { Page } from 'src/app/shared/page';
import { TokenService } from 'src/app/services/token.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  appUserState$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

 

  

  constructor(private supplierService : FournisseurService,
              private tokenService :TokenService,
              private appUserService : AppUserService
              ) { }

  ngOnInit(): void {
    this.getCommandes(); 
    }
    getCommandes(){
    this.appUserState$ = this.appUserService.getAllUser().pipe(
      map((response : ApiResponse<Page>) =>{
          this.responseSubject.next(response)
          console.log(response)
        
          return ({  appState : 'APP_LOADED' , appData : response });
      }
      ),
        startWith({  appState : 'APP_LOADING'}),
        catchError(( error : HttpErrorResponse) => of({ appState : 'APP_ERROR', error}))
        
      );
    }
    goToPage(pageNumber? : number){
      this.appUserState$ = this.appUserService.getAllUser(pageNumber).pipe(
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
    goToNextOrPreviousPage(direction? : string) : void {
      this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
    }
}
