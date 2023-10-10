import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { AppUser } from 'src/app/shared/appUser';
import { TokenDecoder } from 'src/app/shared/tokenDecoder';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: string;
  appUser: AppUser;
  
  constructor(private tokenService :TokenService,
              private appUserService : AppUserService) { }

  ngOnInit(): void {
    this.getTokenByUserPrincipal()
    const appUser = this.getUserByToken(this.token)
    console.log(appUser.sub)
    const username = appUser.sub;
    this.getUserByUserName(username.toString())
   
  }
  getTokenByUserPrincipal(){
    this.token= this.tokenService.getToken();
  }
  getUserByToken(token : string) : TokenDecoder{
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
