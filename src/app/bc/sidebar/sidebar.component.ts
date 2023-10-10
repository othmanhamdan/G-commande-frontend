import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TokenDecoder } from 'src/app/shared/tokenDecoder';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: string;
  appUser : TokenDecoder;
  isLogged : boolean = false;
  constructor(private tokenService : TokenService) { }

  ngOnInit(): void {
    this.getTokenByUserPrincipal()
    this.appUser = this.getUserByToken(this.token)
    console.log(this.appUser)
    this.isAdmin();
    console.log(this.isLogged)
  }
  isAdmin(){
    for (let role of this.appUser.roles){
      if ( role == "ADMIN"){
        console.log(role)
        this.isLogged = true;
      }
    }
  }
  logout(){
    this.tokenService.clearToken();
  }

  getTokenByUserPrincipal(){
    this.token= this.tokenService.getToken();
  }
  getUserByToken(token : string) : TokenDecoder{
    return JSON.parse(atob(token.split('.')[1]));
  }

}
