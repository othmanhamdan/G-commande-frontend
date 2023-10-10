import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.css']
})
export class AddRoleToUserComponent implements OnInit {

  userName : string = ''
  nameRole : string = ''

  constructor(private appUserService : AppUserService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.userName)
    console.log(this.nameRole)
    this.appUserService.addRoleToUser(this.userName, this.nameRole).subscribe(
      user => console.log(user)
    )
  }

}
