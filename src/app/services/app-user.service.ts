import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../shared/appUser';
import { AppRole } from '../shared/appRole';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private apiUrl = environment.apiUrl;
  constructor(private http :HttpClient) { }

  getUserByName(userName : string) : Observable<any>{
    const url = `${this.apiUrl}/users/${userName}`;
    return this.http.get<any>(url);
  }
  saveUser(user : AppUser) : Observable<any>{
    const url = `${this.apiUrl}/users`;
    return this.http.post<any>(url , user);
  }
  saveRole(role : AppRole) : Observable<any>{
    const url = `${this.apiUrl}/roles`;
    return this.http.post<any>(url , role);
  }
  addRoleToUser(userName : string, roleName : string): Observable<any>{
    const url = `${this.apiUrl}/users/addRoleToUsers?userName=${userName}&roleName=${roleName}`;
    return this.http.post<any>(url , null);
  }
  getAllUser(page : number = 0, size : number = 10): Observable<any>{
    const url = `${this.apiUrl}/users?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  getAllRole(): Observable<any>{
    const url = `${this.apiUrl}/roles`;
    return this.http.get<any>(url);
  }
  
}
