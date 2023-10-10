import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AppUserService } from 'src/app/services/app-user.service';
import { CommandesService } from 'src/app/services/commandes.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { TokenService } from 'src/app/services/token.service';
import { AppUser } from 'src/app/shared/appUser';
import { Commande } from 'src/app/shared/commande';
import { Fournisseur } from 'src/app/shared/fournisseur';
import { TokenDecoder } from 'src/app/shared/tokenDecoder';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

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
    commandeItems : null
  }
  forns: Fournisseur[] = [];
  fourniss :Fournisseur ={
    id: null,
    compte: null,
    libelle: null,
    commandes: null
  }
  token: string;
  appUser: AppUser;
 

  constructor(private commandeService : CommandesService ,
              private flashMessage : FlashMessagesService ,
              private router : Router,
              private fournisseurService : FournisseurService,
              private tokenService :TokenService,
              private appUserService : AppUserService) { }

  ngOnInit(): void {
    this.getFourinsseur();
    this.getTokenByUserPrincipal()
    const appUser = this.getUserByToken(this.token)
    console.log(appUser.sub)
    const username = appUser.sub;
    this.getUserByUserName(username.toString())
    
    
  }
  getFourinsseur(){
    this.fournisseurService.getAllFournisseur().subscribe(frns =>{
      this.forns = frns;
      console.log(this.forns)
    }, error =>{
      console.log(error); 
    })
  }
  changeFournisseur(e){
    this.fourniss.id = e.target.value;
    this.commande.fournisseur = this.fourniss;
   
  }

  onSubmit(){
    this.commande.appUser = this.appUser;
    this.commandeService.saveCommande(this.commande).subscribe(
      cmd => {
        console.log(cmd);
        this.flashMessage.show('Commande added successfully', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/bc/list'])
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la commande:', error);
      }
    ) 
    
   
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
        console.log(user);
      }
    )
  }

  
}
