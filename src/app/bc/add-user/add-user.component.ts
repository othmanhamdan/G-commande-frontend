import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { AppUser } from 'src/app/shared/appUser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  appUser : AppUser = {
    id: null,
    nom: null,
    prenom: null,
    password : null,
    cni: null,
    e_mail: null,
    userName: null,
    commandes: null
  }
  constructor(private appUserService : AppUserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const uName = this.appUser.prenom.charAt(0);
    this.appUser.userName = uName + "." + this.appUser.nom;
    console.log(this.appUser);
    this.appUserService.saveUser(this.appUser).subscribe(
       user => {
        //this.appUser = user,
        console.log(user);
      }
    )
    //this.vider()
  }
  vider(){
    this.appUser.nom = '';
    this.appUser.prenom = '';
    this.appUser.password = '';
    this.appUser.e_mail = '';
    this.appUser.cni = '';
  }

}
