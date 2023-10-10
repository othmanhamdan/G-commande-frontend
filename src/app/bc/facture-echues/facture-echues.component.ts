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


@Component({
  selector: 'app-facture-echues',
  templateUrl: './facture-echues.component.html',
  styleUrls: ['./facture-echues.component.css']
})
export class FactureEchuesComponent implements OnInit {

  factureState$  : Observable<{ appState : string , appData? : ApiResponse<Page> , error? : HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  searshCommande$: Observable<{ appState: string; appData?: ApiResponse<Page>; error?: HttpErrorResponse; }>;
  token: string;
  appUser: AppUser;
 

  

  constructor(private factureService: FactureService,
              private router : Router,
              private matDialog: MatDialog,
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
    const numero = '';
    const libelle = '';

    this.factureState$ = this.factureService.getAllFactureEchues$(numero,libelle,username).pipe(
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
    goToPage(numero? : string, libelle? :string,userName? : string, pageNumber? : number){
      this.factureState$ = this.factureService.getAllFactureEchues$(numero,libelle,this.appUser.userName, pageNumber).pipe(
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
    goToNextOrPreviousPage(direction? : string, numero? : string, libelle? :string,userName? : string ) : void {
      this.goToPage(numero,libelle, this.appUser.userName,direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
    }
    openRegle(fac){
      this.router.navigate(['/bc/vide'])
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "40%";
      dialogConfig.height= "58%";
      dialogConfig.data = {
        id : fac.id,
        numero : fac.numero,
        dateFacture: fac.dateFacture,
        montanHT: fac.montanHT,
        montantTva: fac.montantTva,
        montantTTC: fac.montantTTC,
        dateEcheance: fac.dateEcheance,
        dateReglement: fac.dateReglement,
        dateSaisie : fac.dateSaisie,
        dateReceptionCompta: fac.dateReceptionCompta,
        dateLivraison: fac.dateLivraison,
        receptionSaisie: fac.receptionSaisie,
        commande: fac.commande
      }
      this.matDialog.open(RegleeComponent, dialogConfig);
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
