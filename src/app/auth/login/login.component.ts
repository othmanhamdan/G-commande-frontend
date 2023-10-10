import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { AppUser } from 'src/app/shared/appUser';
import { Login } from 'src/app/shared/login';
import { Token } from 'src/app/shared/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : Login = {
    userName: '',
    password: ''
  };
  appUser : AppUser[] = [];
  erorr: any;

  //login : Object;
  constructor(private loginService : LoginService,
              private route : Router,
              private tokenService : TokenService,
              private appUserService : AppUserService) { }

  ngOnInit(): void {
   
  }
  onSubmit(){
    console.log(this.user)
      this.loginService.login(this.user.userName,this.user.password).subscribe(
       (data : Token) => {
        console.log(data.acces_token),
        this.tokenService.saveToken(data.acces_token)
        if(data.acces_token !== null){
          this.appUserService.getUserByName(this.user.userName).subscribe(
            user => {
              this.appUser = user,
              //this.appUser.emit(user.userName),
              console.log(user)

            }
          )
        }
       } ,
       error => {
         this.erorr = error.status 
       })
      }
      
     
    
    
  
 

}
