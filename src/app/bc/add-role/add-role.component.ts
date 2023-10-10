import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user.service';
import { AppRole } from 'src/app/shared/appRole';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  appRole : AppRole ={
    id: null,
    nameRole : null,
  }
  allRole : AppRole[] = [];
   
  constructor(private appUserService : AppUserService,
              private router : Router) { }

  ngOnInit(): void {
    this.getAllRole()
  }
  onSubmit(){
    this.appUserService.saveRole(this.appRole).subscribe(
      role =>{
        console.log(role),
        this.getAllRole()
      }      
    )
    
      
   
  }
  getAllRole(){
    this.appUserService.getAllRole().subscribe(
      allRole =>{
        console.log(allRole),
        this.allRole = allRole        
      }
    )
    
  }

}
